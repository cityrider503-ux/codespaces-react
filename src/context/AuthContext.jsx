import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

async function loadProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let profileRequest = 0;

    async function syncSession(nextSession) {
      const requestId = ++profileRequest;
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setProfile(null);
      setLoading(true);

      if (!nextSession?.user) {
        if (active && requestId === profileRequest) setLoading(false);
        return;
      }

      try {
        const nextProfile = await loadProfile(nextSession.user.id);
        if (active && requestId === profileRequest) setProfile(nextProfile);
      } catch (error) {
        if (active && requestId === profileRequest) toast.error(error.message || 'Unable to load your profile.');
      } finally {
        if (active && requestId === profileRequest) setLoading(false);
      }
    }

    async function hydrateSession() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (!active) return;

        await syncSession(data.session);
      } catch (error) {
        if (active) toast.error(error.message || 'Unable to load your session.');
      } finally {
        if (active && profileRequest === 0) setLoading(false);
      }
    }

    hydrateSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      void syncSession(nextSession);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success('Welcome back.');
      return data;
    } catch (error) {
      toast.error(error.message || 'Unable to sign in.');
      throw error;
    }
  }

  async function signUp(email, password, metadata = {}) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: metadata },
      });
      if (error) throw error;
      toast.success('Account created. Check your email to verify it.');
      return data;
    } catch (error) {
      toast.error(error.message || 'Unable to create your account.');
      throw error;
    }
  }

  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Signed out.');
    } catch (error) {
      toast.error(error.message || 'Unable to sign out.');
      throw error;
    }
  }

  const value = useMemo(
    () => ({ session, user, profile, loading, signIn, signUp, signOut }),
    [session, user, profile, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside an AuthProvider.');
  return context;
}
