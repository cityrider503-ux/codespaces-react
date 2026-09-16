import { ArrowUpRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-[#101c2b] text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link to="/" className="font-display text-3xl font-bold text-white">Teso Post</Link>
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
      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-slate-500">© {new Date().getFullYear()} Teso Post. Built for curious readers.</div>
    </footer>
  );
}