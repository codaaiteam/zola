import { auth, clerkClient } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function NativeCompletePage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in/native-bridge")
  }

  const client = await clerkClient()
  const token = await client.signInTokens.createSignInToken({
    userId,
    expiresInSeconds: 300,
  })

  const callbackUrl = `nottoai://auth-callback?ticket=${encodeURIComponent(token.token)}`

  return (
    <html>
      <body
        style={{
          fontFamily:
            "-apple-system, BlinkMacSystemFont, sans-serif, system-ui",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          margin: 0,
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
            Returning to NottoAI…
          </h1>
          <p style={{ color: "#666", marginBottom: "1.5rem" }}>
            If you are not redirected automatically, tap the button below.
          </p>
          <a
            href={callbackUrl}
            style={{
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              background: "#000",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "0.5rem",
              fontWeight: 600,
            }}
          >
            Open NottoAI
          </a>
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `setTimeout(function(){window.location.href=${JSON.stringify(callbackUrl)}}, 100);`,
          }}
        />
      </body>
    </html>
  )
}
