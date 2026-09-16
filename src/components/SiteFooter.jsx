import { ArrowUpRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-slate-950/90 text-slate-300 backdrop-blur-xl">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link to="/" className="flex items-center gap-3 font-display text-3xl font-bold text-white">
            <img src={logo} alt="TESO POST logo" className="h-10 w-10 rounded-full object-cover ring-2 ring-white/10" />
            <span className="tracking-[0.14em] uppercase">TESO POST</span>
          </Link>
          <p className="mt-4 max-w-sm leading-7 text-slate-400">Independent reporting, thoughtful commentary, and the stories shaping our shared corner of the world.</p>
        </div>
        <div>
          <p className="eyebrow text-teal-300">Explore</p>
          <div className="mt-4 flex flex-col gap-3 text-sm"><Link className="hover:text-white" to="/about">About us</Link><Link className="hover:text-white" to="/contact">Contact</Link><Link className="hover:text-white" to="/privacy">Privacy policy</Link></div>
        </div>
        <div>
          <p className="eyebrow text-teal-300">Stay close</p>
          <a className="mt-4 inline-flex items-center gap-2 text-sm hover:text-white" href="mailto:hello@tesopost.com"><Mail size={16} /> hello@tesopost.com <ArrowUpRight size={15} /></a>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-slate-500">© {new Date().getFullYear()} TESO POST. Built for curious readers.</div>
    </footer>
  );
}