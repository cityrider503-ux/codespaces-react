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
  return <><SiteHeader /><main className="mx-auto max-w-5xl px-6 py-20"><div className="grid gap-14 md:grid-cols-[0.8fr_1.2fr]"><div><p className="eyebrow text-teal-700">Open line</p><h1 className="font-display mt-5 text-6xl font-bold leading-none text-slate-950">Let’s talk.</h1><p className="mt-7 max-w-sm leading-8 text-slate-600">Have a story tip, a correction, or a thoughtful disagreement? Our inbox is open.</p><a className="mt-8 inline-flex items-center gap-3 font-semibold text-teal-700" href="mailto:hello@tesopost.com"><Mail size={18} /> hello@tesopost.com</a></div><form className="space-y-5 border-t border-slate-200 pt-8 md:border-l md:border-t-0 md:pl-12" onSubmit={handleSubmit}><label className="block"><span className="mb-2 block text-sm font-semibold">Your name</span><input className="w-full border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-teal-700" required /></label><label className="block"><span className="mb-2 block text-sm font-semibold">Email address</span><input className="w-full border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-teal-700" type="email" required /></label><label className="block"><span className="mb-2 block text-sm font-semibold">Message</span><textarea className="w-full border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-teal-700" rows="6" required /></label><button className="inline-flex items-center gap-2 bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-teal-800" type="submit" disabled={sent}><Send size={17} /> {sent ? 'Message sent' : 'Send message'}</button></form></div></main><SiteFooter /></>;
}