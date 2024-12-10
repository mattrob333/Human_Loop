import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          created_at: string;
          email: string;
          full_name: string;
        };
        Insert: {
          id: string;
          created_at?: string;
          email: string;
          full_name: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          email?: string;
          full_name?: string;
        };
      };
      assessment_results: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          enneagram_type: number;
          communication_style: string;
          emotional_style: string;
          goal_orientation: string;
          adaptability_style: string;
          rubric: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          enneagram_type: number;
          communication_style: string;
          emotional_style: string;
          goal_orientation: string;
          adaptability_style: string;
          rubric: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          enneagram_type?: number;
          communication_style?: string;
          emotional_style?: string;
          goal_orientation?: string;
          adaptability_style?: string;
          rubric?: string;
        };
      };
      chat_transcripts: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          transcript: string;
          ai_analysis: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          transcript: string;
          ai_analysis: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          transcript?: string;
          ai_analysis?: string;
        };
      };
    };
  };
};