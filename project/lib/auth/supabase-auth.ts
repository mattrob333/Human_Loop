import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/lib/supabase/types';

export const createSupabaseClient = () => {
  return createClientComponentClient<Database>();
};

export const signOut = async (supabase: ReturnType<typeof createSupabaseClient>) => {
  try {
    await supabase.auth.signOut();
    return { success: true, error: null };
  } catch (error) {
    console.error('Error signing out:', error);
    return { success: false, error };
  }
};

export const getSession = async (supabase: ReturnType<typeof createSupabaseClient>) => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return { session, error: null };
  } catch (error) {
    console.error('Error getting session:', error);
    return { session: null, error };
  }
};