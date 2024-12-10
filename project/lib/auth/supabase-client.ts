import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/lib/supabase/types';

export const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase URL:', supabaseUrl ? 'present' : 'missing');
    console.error('Supabase Anon Key:', supabaseAnonKey ? 'present' : 'missing');
    throw new Error('Missing Supabase environment variables');
  }

  try {
    return createClientComponentClient<Database>({
      supabaseUrl,
      supabaseKey: supabaseAnonKey,
      options: {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          flowType: 'pkce'
        }
      }
    });
  } catch (error) {
    console.error('Error creating Supabase client:', error);
    throw error;
  }
};