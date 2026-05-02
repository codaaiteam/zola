import { SignIn } from "@clerk/nextjs"

export default function NativeBridgeSignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn
        forceRedirectUrl="/sign-in/native-complete"
        signUpForceRedirectUrl="/sign-in/native-complete"
        fallbackRedirectUrl="/sign-in/native-complete"
      />
    </div>
  )
}
