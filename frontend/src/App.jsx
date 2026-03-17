import { SignInButton, UserButton, SignedIn, SignedOut, SignOutButton } from '@clerk/clerk-react'

function App() {
  return (
    <>
      <h1>Welcome to App</h1>

      <SignedOut>
        <SignInButton mode="modal" >
          <button >hii</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton />
        <SignOutButton />
      </SignedIn>
    </>
  )
}

export default App