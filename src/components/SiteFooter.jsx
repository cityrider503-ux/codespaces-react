import { ArrowUpRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-slate-900/10 bg-white/35 text-slate-700 backdrop-blur-xl">
      <div className="mx-auto max-w-[1500px] px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-12 md:grid-cols-[1.8fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-3 text-slate-950">
              <img src={logo} alt="TESO POST logo" className="h-11 w-11 rounded-full object-cover ring-2 ring-white/80 shadow-[0_10px_30px_rgba(15,23,42,0.12)]" />
              <span className="text-xl font-black tracking-[0.18em] uppercase">TESO POST</span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-600">Independent reporting, thoughtful commentary, and the stories shaping our shared corner of the world.</p>
            <a className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-800 transition-colors hover:text-teal-600" href="mailto:hello@tesopost.com">
              <Mail size={16} aria-hidden="true" />
              hello@tesopost.com
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
          <div>
            <p className="eyebrow text-teal-700">Explore</p>
            <div className="mt-5 flex flex-col gap-3 text-sm font-semibold">
              <Link className="transition-colors hover:text-teal-700" to="/about">About us</Link>
              <Link className="transition-colors hover:text-teal-700" to="/contact">Contact</Link>
              <Link className="transition-colors hover:text-teal-700" to="/privacy">Privacy policy</Link>
            </div>
          </div>
          <div>
            <p className="eyebrow text-teal-700">Our promise</p>
            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-600">A clear-eyed place for curious readers, built around stories worth staying with.</p>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-900/10 px-4 py-5 md:px-6">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} TESO POST</span>
          <span>Built for curious readers.</span>
        </div>
      </div>
    </footer>
  );
}