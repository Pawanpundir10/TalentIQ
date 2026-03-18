import { StreamChat } from "stream-chat";
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  throw new Error("Missing Stream API key or secret");
}

export const chatclient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await chatclient.upsertUser(userData);
    console.log("stream user upserted successfully", userData);
  } catch (error) {
    console.error("Error upserting user:", error);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await chatclient.deleteUser(userId);
    console.log("stream user deleted successfully", userId);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
