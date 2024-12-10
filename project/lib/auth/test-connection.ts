'use client';

import { createSupabaseClient } from './supabase-client';

export async function testSupabaseConnection() {
  const supabase = createSupabaseClient();
  
  if (!supabase) {
    console.error('Supabase client not initialized - check environment variables');
    return {
      success: false,
      error: 'Client initialization failed'
    };
  }

  try {
    const { error } = await supabase.auth.getSession();
    if (error) throw error;
    
    console.log('Supabase connection successful');
    return {
      success: true,
      error: null
    };
  } catch (error) {
    console.error('Supabase connection test failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}