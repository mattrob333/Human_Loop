export const config = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
} as const;

// Validate required environment variables
Object.entries(config.supabase).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing required environment variable: NEXT_PUBLIC_SUPABASE_${key.toUpperCase()}`);
  }
});