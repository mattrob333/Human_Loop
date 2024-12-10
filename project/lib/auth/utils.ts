import { createSupabaseClient } from './supabase-client';
import { redirect } from 'next/navigation';

export async function requireAuth() {
  if (process.env.NODE_ENV === 'development') {
    return;
  }

  const supabase = createSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth/signin');
  }
}

export async function redirectIfAuthenticated() {
  if (process.env.NODE_ENV === 'development') {
    return;
  }

  const supabase = createSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    redirect('/dashboard');
  }
}