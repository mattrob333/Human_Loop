'use client';

import { useState, useEffect } from 'react';
import { createSupabaseClient } from '../supabase-client';
import type { AuthState } from '../types';

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
  });

  const supabase = createSupabaseClient();

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setState(prev => ({
          ...prev,
          session,
          user: session?.user ?? null,
          isLoading: false,
        }));
      } catch (error) {
        console.error('Error fetching session:', error);
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState(prev => ({
        ...prev,
        session,
        user: session?.user ?? null,
      }));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return state;
}