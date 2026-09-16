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
              <h2>What we collect</h2>
              <p>When you create an account or publish an article, we collect the information needed to provide those features, such as your email address, profile details, and content you choose to share.</p>
              <h2>How we use it</h2>
              <p>We use this information to authenticate accounts, publish and manage articles, respond to messages, and keep Teso Post secure. We do not sell personal information.</p>
              <h2>Your choices</h2>
              <p>You can update your profile or contact us about accessing, correcting, or deleting your information. Email <a href="mailto:hello@tesopost.com">hello@tesopost.com</a> with questions.</p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}