import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Info, LogOut, Menu, PenLine } from 'lucide-react';
import logo from '../logo.svg';
import { useAuth } from '../context/AuthContext';

export default function SiteHeader() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleSignOut() {
    await signOut();
    setMobileOpen(false);
    navigate('/');
  }

  function closeMobileNav() {
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/55 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-4 md:px-6">
        <Link to="/" className="flex items-center gap-3 text-slate-950">
          <img src={logo} alt="TESO POST logo" className="h-10 w-10 rounded-full object-cover ring-2 ring-white/80 shadow-[0_10px_30px_rgba(15,23,42,0.12)]" />
          <span className="text-lg font-black tracking-[0.18em] uppercase sm:text-xl">TESO POST</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 md:flex">
          <Link className="transition-colors hover:text-teal-700" to="/about">About</Link>
          <Link className="transition-colors hover:text-teal-700" to="/contact">Contact</Link>
          {user ? (
            <>
              <Link className="hidden items-center gap-2 sm:flex" to="/dashboard">
                {profile?.full_name || user.email}
              </Link>
              <Link className="inline-flex items-center gap-2" to="/create-post">
                <PenLine size={16} aria-hidden="true" />
                Write
              </Link>
              <button className="inline-flex items-center gap-2" type="button" onClick={handleSignOut}>
                <LogOut size={16} aria-hidden="true" />
                Sign out
              </button>
            </>
          ) : null}
        </nav>
        <button className="rounded-full border border-slate-200 bg-white/70 p-2 text-slate-700 shadow-sm backdrop-blur md:hidden" type="button" aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen} title={mobileOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMobileOpen((current) => !current)}>
          <Menu size={20} aria-hidden="true" />
        </button>
      </div>
      <nav id="mobile-nav" className={`${mobileOpen ? '' : 'hidden '}border-t border-white/20 bg-white/70 px-6 py-4 backdrop-blur-xl md:hidden`}>
        <div className="flex flex-col gap-4 text-sm font-semibold text-slate-700">
          <Link onClick={closeMobileNav} to="/about"><Info className="mr-2 inline" size={16} />About</Link>
          <Link onClick={closeMobileNav} to="/contact">Contact</Link>
          {user ? (
            <>
              <Link onClick={closeMobileNav} to="/dashboard">Dashboard</Link>
              <Link onClick={closeMobileNav} to="/create-post">Write</Link>
              <button className="text-left" type="button" onClick={handleSignOut}>Sign out</button>
            </>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
