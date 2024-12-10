import type { User, Session } from '@supabase/supabase-js';

export interface AuthResult {
  success: boolean;
  error: Error | null;
}

export interface SessionResult {
  session: Session | null;
  error: Error | null;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
}