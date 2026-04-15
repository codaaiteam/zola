import { Metadata } from "next"
import Link from "next/link"
import { ZolaFaviconIcon } from "@/components/icons/zola"

export const metadata: Metadata = {
  title: "Privacy Policy",
}

export default function PrivacyPage() {
  return (
    <div className="bg-background min-h-screen">
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-base font-medium tracking-tight"
          >
            <ZolaFaviconIcon className="size-7" />
            <span className="font-medium">Notto</span>
            <span className="font-normal opacity-80">AI</span>
          </Link>
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground text-sm"
          >
            Back
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h1 className="text-foreground mb-2 text-3xl font-bold">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground mb-12 text-sm">
          Last updated: April 13, 2026
        </p>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-foreground mb-3 text-lg font-semibold">
              1. Introduction
            </h2>
            <p className="text-muted-foreground">
              NottoAI (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates
              the website nottoai.com and the NottoAI application (the
              &quot;Service&quot;). This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you use our
              Service.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-lg font-semibold">
              2. Information We Collect
            </h2>
            <p className="text-muted-foreground mb-3">
              We collect information in the following ways:
            </p>
            <ul className="text-muted-foreground list-disc space-y-2 pl-5">
              <li>
                <strong className="text-foreground">Account Information:</strong>{" "}
                When you create an account, we collect your email address, name,
                and profile image via our authentication provider (Clerk).
              </li>
              <li>
                <strong className="text-foreground">
                  Conversation Data:
                </strong>{" "}
                Messages you send and receive through the Service are stored to
                provide conversation history. You can delete your conversations
                at any time.
              </li>
              <li>
                <strong className="text-foreground">Payment Information:</strong>{" "}
                Payment processing is handled by Stripe. We do not store your
                credit card details. We store your Stripe customer ID and
                subscription status.
              </li>
              <li>
                <strong className="text-foreground">API Keys (BYOK):</strong>{" "}
                If you provide your own API keys, they are encrypted using
                AES-256 encryption before storage and are never stored in plain
                text.
              </li>
              <li>
                <strong className="text-foreground">Usage Data:</strong>{" "}
                We track credit usage, message counts, and model selections to
                manage your subscription and improve the Service.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-lg font-semibold">
              3. How We Use Your Information
            </h2>
            <ul className="text-muted-foreground list-disc space-y-2 pl-5">
              <li>To provide, maintain, and improve the Service</li>
              <li>To process transactions and manage subscriptions</li>
              <li>To send important service-related communications</li>
              <li>To enforce our terms of service</li>
              <li>To detect and prevent fraud or abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-lg font-semibold">
              4. Third-Party Services
            </h2>
            <p className="text-muted-foreground mb-3">
              We use the following third-party services to operate:
            </p>
            <ul className="text-muted-foreground list-disc space-y-2 pl-5">
              <li>
                <strong className="text-foreground">Clerk</strong> — Authentication and user management
              </li>
              <li>
                <strong className="text-foreground">Stripe</strong> — Payment processing
              </li>
              <li>
                <strong className="text-foreground">Supabase</strong> — Database and data storage
              </li>
              <li>
                <strong className="text-foreground">OpenRouter</strong> — AI model API routing
              </li>
            </ul>
            <p className="text-muted-foreground mt-3">
              Your messages are sent to third-party AI providers (OpenAI,
              Anthropic, Google, etc.) for processing. Please refer to their
              respective privacy policies for how they handle data.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-lg font-semibold">
              5. Data Retention
            </h2>
            <p className="text-muted-foreground">
              We retain your data for as long as your account is active. You can
              request deletion of your account and all associated data by
              contacting us at{" "}
              <a
                href="mailto:contact@nottoai.com"
                className="text-emerald-600 hover:underline"
              >
                contact@nottoai.com
              </a>
              . Upon account deletion, your data will be permanently removed
              within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-lg font-semibold">
              6. Data Security
            </h2>
            <p className="text-muted-foreground">
              We implement industry-standard security measures to protect your
              data, including encryption in transit (TLS) and at rest, CSRF
              protection, and encrypted API key storage. However, no method of
              transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-lg font-semibold">
              7. Your Rights
            </h2>
            <ul className="text-muted-foreground list-disc space-y-2 pl-5">
              <li>Access and download your personal data</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and data</li>
              <li>Object to data processing</li>
              <li>Export your conversation history</li>
            </ul>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-lg font-semibold">
              8. Cookies
            </h2>
            <p className="text-muted-foreground">
              We use essential cookies for authentication and CSRF protection.
              We use a privacy-friendly analytics tool that does not use cookies
              for tracking. We do not use advertising cookies.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-lg font-semibold">
              9. Children&apos;s Privacy
            </h2>
            <p className="text-muted-foreground">
              The Service is not intended for users under the age of 13. We do
              not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-lg font-semibold">
              10. Changes to This Policy
            </h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will
              notify you of any material changes by posting the new policy on
              this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-lg font-semibold">
              11. Contact Us
            </h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <a
                href="mailto:contact@nottoai.com"
                className="text-emerald-600 hover:underline"
              >
                contact@nottoai.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
