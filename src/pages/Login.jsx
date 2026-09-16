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

  return <><SiteHeader /><main className="mx-auto max-w-md px-6 py-16"><p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">Teso Post</p><h1 className="mt-3 text-5xl font-bold tracking-tight text-slate-950">{mode === 'signin' ? 'Welcome back' : 'Create an account'}</h1><form className="mt-10 space-y-5" onSubmit={handleSubmit}><label className="block"><span className="mb-2 block font-semibold">Email</span><input className="w-full border border-slate-300 bg-white px-4 py-3" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label><label className="block"><span className="mb-2 block font-semibold">Password</span><input className="w-full border border-slate-300 bg-white px-4 py-3" type="password" minLength="6" value={password} onChange={(event) => setPassword(event.target.value)} required /></label><button className="w-full bg-slate-950 px-5 py-3 font-semibold text-white disabled:opacity-50" type="submit" disabled={busy}>{busy ? 'Working...' : mode === 'signin' ? 'Sign in' : 'Create account'}</button></form><button className="mt-6 text-sm font-semibold text-teal-700 underline" type="button" onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}>{mode === 'signin' ? 'Need an account?' : 'Already have an account?'}</button><p className="mt-6"><Link className="text-sm text-slate-600 underline" to="/">Return home</Link></p></main></>;
}
