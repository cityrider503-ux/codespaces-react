import { useState } from 'react';
import toast from 'react-hot-toast';
import { Mail, Send } from 'lucide-react';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSent(true);
    toast.success('Message received. We will be in touch.');
  }

  return (
    <>
      <SiteHeader />
      <main className="relative overflow-hidden pb-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[400px] bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.12),_transparent_58%)]" />
        <div className="relative mx-auto max-w-[1500px] px-4 py-12 md:px-6 md:py-20">
          <div className="glass-panel mx-auto max-w-5xl rounded-[30px] border border-white/20 p-6 sm:p-8 md:p-10">
            <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-start">
              <div>
                <p className="eyebrow text-teal-700">Open line</p>
                <h1 className="mt-5 font-display text-5xl font-bold leading-none text-slate-950 md:text-6xl">Let’s talk.</h1>
                <p className="mt-7 max-w-sm leading-8 text-slate-600">
                  Have a story tip, a correction, or a thoughtful disagreement? Our inbox is open.
                </p>
                <a className="mt-8 inline-flex items-center gap-3 font-semibold text-teal-700" href="mailto:hello@tesopost.com">
                  <Mail size={18} /> hello@tesopost.com
                </a>
              </div>

              <form className="rounded-[24px] border border-slate-200/80 bg-white/50 p-5 shadow-sm sm:p-6" onSubmit={handleSubmit}>
                <div className="space-y-5">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">Your name</span>
                    <input className="w-full rounded-2xl border border-slate-300 bg-white/80 px-4 py-3 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-200" required />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">Email address</span>
                    <input className="w-full rounded-2xl border border-slate-300 bg-white/80 px-4 py-3 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-200" type="email" required />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">Message</span>
                    <textarea className="w-full rounded-2xl border border-slate-300 bg-white/80 px-4 py-3 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-200" rows="6" required />
                  </label>
                  <button className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-slate-800" type="submit" disabled={sent}>
                    <Send size={17} /> {sent ? 'Message sent' : 'Send message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}