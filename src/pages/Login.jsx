import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SiteHeader from '../components/SiteHeader';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    try {
      if (mode === 'signin') await signIn(email, password);
      else await signUp(email, password);
      navigate(location.state?.from?.pathname || '/dashboard', { replace: true });
    } catch {
      // AuthContext displays the server error.
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="relative overflow-hidden pb-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[300px] bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.12),_transparent_58%)]" />
        <div className="relative mx-auto max-w-[1500px] px-4 py-12 md:px-6 md:py-20">
          <div className="mx-auto max-w-md rounded-[30px] border border-white/20 bg-white/50 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">TESO POST</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              {mode === 'signin' ? 'Welcome back' : 'Create an account'}
            </h1>

            <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block font-semibold text-slate-700">Email</span>
                <input className="w-full rounded-2xl border border-slate-300 bg-white/80 px-4 py-3 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-200" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
              </label>
              <label className="block">
                <span className="mb-2 block font-semibold text-slate-700">Password</span>
                <input className="w-full rounded-2xl border border-slate-300 bg-white/80 px-4 py-3 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-200" type="password" minLength="6" value={password} onChange={(event) => setPassword(event.target.value)} required />
              </label>
              <button className="w-full rounded-full bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50" type="submit" disabled={busy}>
                {busy ? 'Working...' : mode === 'signin' ? 'Sign in' : 'Create account'}
              </button>
            </form>

            <button className="mt-6 text-sm font-semibold text-teal-700 underline" type="button" onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}>
              {mode === 'signin' ? 'Need an account?' : 'Already have an account?'}
            </button>
            <p className="mt-6">
              <Link className="text-sm text-slate-600 underline" to="/">Return home</Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
