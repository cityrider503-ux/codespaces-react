import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';

export default function Privacy() {
  return (
    <>
      <SiteHeader />
      <main className="relative overflow-hidden pb-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[350px] bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.12),_transparent_60%)]" />
        <div className="relative mx-auto max-w-[1500px] px-4 py-12 md:px-6 md:py-20">
          <div className="glass-panel mx-auto max-w-4xl rounded-[30px] border border-white/20 p-6 sm:p-8 md:p-12">
            <p className="eyebrow text-teal-700">The fine print</p>
            <h1 className="mt-5 font-display text-5xl font-bold leading-none text-slate-950 md:text-6xl">Privacy policy</h1>
            <p className="mt-6 text-sm text-slate-500">Last updated September 16, 2026</p>
            <div className="prose prose-lg mt-12 max-w-none prose-headings:font-display prose-headings:text-slate-950 prose-a:text-teal-700">
              <h2>1. Privacy</h2>
              <p>Teso Post respects your privacy. This policy explains what information we collect when you use our website, how we use it, the service providers that help us operate the platform, and the choices available to you.</p>
              <p>You may browse public articles without creating an account. An account is required for features such as publishing and managing your own articles. If you choose not to provide information needed for an account or a requested feature, we may not be able to provide that feature.</p>

              <h2>1.1 What information is stored?</h2>
              <p>We collect information you provide directly and limited technical information needed to authenticate users, publish content, protect the service, and keep the website working.</p>

              <h3>1.1.1 Information you provide directly</h3>
              <p>When you create or update an account, we may store your email address, password credentials handled by our authentication provider, full name, and optional avatar information.</p>

              <h3>1.1.2 Articles and media you publish</h3>
              <p>When you create an article, we store the title, slug, excerpt, article body, category, publication status, creation date, author account, and any image you upload. Published articles and the author name shown with them may be visible to the public.</p>

              <h3>1.1.3 Information collected automatically</h3>
              <p>Our hosting, authentication, and security providers may process technical information such as your IP address, browser type, device information, approximate location, access times, and error or security logs. We use this information to deliver the website, maintain sessions, diagnose problems, and protect the service from abuse.</p>

              <h2>1.2 Who has access to the information?</h2>
              <p>Teso Post personnel and authorized service providers may access information only when it is needed to operate, maintain, secure, or improve the website. Our application uses Supabase for authentication, database services, and image storage. Those services process information on our behalf under their applicable terms and privacy practices.</p>
              <p>We may disclose information when required by law, to respond to a valid legal request, to enforce our terms, or to protect the rights, safety, and security of Teso Post, our readers, or other people. We do not sell your personal information.</p>

              <h2>1.3 How is information collected?</h2>
              <p>Information is collected when you register, sign in, update your profile, publish an article, upload an image, or contact us. Technical information may be recorded automatically by the website, hosting provider, authentication service, and security systems when you visit or use the platform.</p>

              <h2>1.4 How is information processed?</h2>
              <p>We process information to provide the features you request, including account authentication, profile display, article publishing, image delivery, account management, customer support, security monitoring, troubleshooting, and service maintenance.</p>

              <h2>1.5 Cookies and session technologies</h2>
              <p>Our authentication provider uses session technologies so that you can remain signed in and access protected features. Your browser may also store essential technical data used to remember an active session and maintain security. You can adjust browser settings to restrict storage, but doing so may prevent sign-in or other account features from working correctly.</p>

              <h2>1.6 What uses are made of the information?</h2>
              <p>We use information to:</p>
              <ul>
                <li>create, authenticate, and secure user accounts;</li>
                <li>display profiles and attribute published articles to their authors;</li>
                <li>store, publish, edit, and deliver articles and uploaded images;</li>
                <li>respond to questions, support requests, and privacy requests;</li>
                <li>monitor performance, investigate errors, and prevent misuse; and</li>
                <li>meet legal, regulatory, and legitimate administrative obligations.</li>
              </ul>

              <h2>1.7 Can you review, amend, or remove information?</h2>
              <p>Yes. You can update available profile details through your account or contact us to ask about accessing, correcting, or deleting personal information associated with your account. We may need to verify your identity before completing a request.</p>
              <p>Deleting an account may not remove information that must be retained for legal, security, backup, dispute-resolution, or legitimate record-keeping purposes. Public articles may also remain available where they are part of the publication’s editorial archive, although we will review reasonable correction or removal requests.</p>

              <h2>1.8 How long is information retained?</h2>
              <p>We retain account, article, and technical information for as long as needed to provide the service, operate the publication, resolve disputes, enforce agreements, maintain security, and meet legal obligations. Retention periods may differ depending on the type and purpose of the information.</p>

              <h2>1.9 Security</h2>
              <p>We use access controls and the security features provided by our technology partners to protect information. No online service can guarantee absolute security, so please use a strong, unique password and contact us promptly if you believe your account has been accessed without permission.</p>

              <h2>1.10 Children</h2>
              <p>Teso Post is not directed to children who are not legally able to use online services independently. We do not knowingly collect personal information from children for account creation. If you believe a child has provided information to us, please contact us so we can review and remove it where appropriate.</p>

              <h2>1.11 Changes to this policy</h2>
              <p>We may update this policy when our services, technology, or legal obligations change. The revised version will be posted on this page with a new “Last updated” date. Your continued use of the website after an update means the revised policy applies to your use from that date onward.</p>

              <h2>1.12 Contact us</h2>
              <p>For privacy questions or requests, contact Teso Post at <a href="mailto:hello@tesopost.com">hello@tesopost.com</a>. You may also write to us about an account, profile, article, or image associated with your request.</p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}