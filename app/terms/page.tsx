import { Metadata } from "next"
import Link from "next/link"
import { ZolaFaviconIcon } from "@/components/icons/zola"

export const metadata: Metadata = {
  title: "Terms of Service",
}

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p className="text-muted-foreground mb-12 text-sm">
          Last updated: April 13, 2026
        </p>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-foreground mb-3 text-lg font-semibold">
              1. Acceptance of Terms
            </h2>
            <p className="text-muted-foreground">
              By accessing or using NottoAI (&quot;the Service&quot;), you agree
              to be bound by these Terms of Service. If you do not agree to
              these terms, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-lg font-semibold">
              2. Description of Service
            </h2>
            <p className="text-muted-foreground">
              NottoAI is a multi-model AI chat platform that provides access to
              various AI language models (including GPT-5.4, Claude, Gemini,
              DeepSeek, Grok, and others) through a unified interface. The
              Service operates on a credit-based subscription model.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-lg font-semibold">
              3. Account Registration
            </h2>
            <ul className="text-muted-foreground list-disc space-y-2 pl-5">
              <li>You must provide accurate and complete information when creating an account.</li>
              <li>You are responsible for maintaining the security of your account credentials.</li>
              <li>You must be at least 13 years old to use the Service.</li>
              <li>One person may not maintain more than one account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-lg font-semibold">
              4. Subscriptions and Payments
            </h2>
            <ul className="text-muted-foreground list-disc space-y-2 pl-5">
              <li>
                <strong className="text-foreground">Free Plan:</strong> 500
                credits per month with access to free and basic models.
              </li>
              <li>
                <strong className="text-foreground">Paid Plans:</strong> Basic
                ($19.90/mo), Pro ($99.90/mo), and Enterprise ($199.90/mo) plans
                provide additional credits and features.
              </li>
              <li>
                <strong className="text-foreground">Billing:</strong>{" "}
                Subscriptions are billed monthly or yearly. Credits reset at the
                beginning of each billing cycle.
              </li>
              <li>
                <strong className="text-foreground">Refunds:</strong> We offer a
                7-day money-back guarantee on all paid plans. After 7 days,
                payments are non-refundable.
              </li>
              <li>
                <strong className="text-foreground">Cancellation:</strong> You
                may cancel your subscription at any time. You will retain access
                to paid features until the end of your current billing period.
              </li>
              <li>
                <strong className="text-foreground">Credits:</strong> Unused
                credits do not roll over to the next billing period. Different
                models consume credits at different rates based on token usage.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-lg font-semibold">
              5. Acceptable Use
            </h2>
            <p className="text-muted-foreground mb-3">
              You agree not to use the Service to:
            </p>
            <ul className="text-muted-foreground list-disc space-y-2 pl-5">
              <li>Generate content that is illegal, harmful, threatening, abusive, or harassing</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights of others</li>
              <li>Attempt to gain unauthorized access to the Service or its systems</li>
              <li>Interfere with or disrupt the Service</li>
              <li>Use automated tools to access the Service in a manner that exceeds reasonable usage</li>
              <li>Generate spam, phishing content, or malware</li>
              <li>Impersonate any person or entity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-lg font-semibold">
              6. API Keys (BYOK)
            </h2>
            <p className="text-muted-foreground">
              If you provide your own API keys (&quot;Bring Your Own
              Keys&quot;), you are responsible for any charges incurred on those
              keys. We encrypt your keys using AES-256 encryption but are not
              liable for any unauthorized use resulting from compromised
              credentials on your end.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-lg font-semibold">
              7. Intellectual Property
            </h2>
            <p className="text-muted-foreground">
              You retain ownership of the content you create using the Service.
              We do not claim ownership over your conversations or generated
              content. The NottoAI brand, logo, and platform design are our
              intellectual property.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-lg font-semibold">
              8. AI-Generated Content
            </h2>
            <p className="text-muted-foreground">
              AI-generated responses may contain inaccuracies, biases, or errors.
              You are responsible for reviewing and verifying any AI-generated
              content before relying on it. We are not liable for decisions made
              based on AI-generated content.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-lg font-semibold">
              9. Service Availability
            </h2>
            <p className="text-muted-foreground">
              We strive to maintain high availability but do not guarantee
              uninterrupted access to the Service. The availability of specific
              AI models depends on their respective providers and may change
              without notice.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-lg font-semibold">
              10. Limitation of Liability
            </h2>
            <p className="text-muted-foreground">
              To the maximum extent permitted by law, NottoAI shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages, including loss of profits, data, or business
              opportunities, arising from your use of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-lg font-semibold">
              11. Termination
            </h2>
            <p className="text-muted-foreground">
              We reserve the right to suspend or terminate your account if you
              violate these Terms. Upon termination, your right to use the
              Service will immediately cease. You may also delete your account
              at any time.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-lg font-semibold">
              12. Changes to Terms
            </h2>
            <p className="text-muted-foreground">
              We may modify these Terms at any time. Material changes will be
              communicated via the Service or email. Continued use of the
              Service after changes constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-foreground mb-3 text-lg font-semibold">
              13. Contact
            </h2>
            <p className="text-muted-foreground">
              For questions about these Terms, please contact us at{" "}
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
