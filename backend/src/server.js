import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Middleware first — always, in both dev and production
app.use(express.json());
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);

// ✅ API routes
app.get("/api/health", (req, res) => {
  res.status(200).json({ msg: "Server is running!" });
});

// ✅ Inngest webhook handler
app.use("/api/inngest", serve({ client: inngest, functions }));

// ✅ Serve frontend in production (after all API routes)
if (ENV.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(distPath));

  // Catch-all: serve index.html for client-side routing
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log(`Server is running on port ${ENV.PORT}`);
    });
  } catch (error) {
    console.log("Error starting the server:", error);
  }
};

startServer();
