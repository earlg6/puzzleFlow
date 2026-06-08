import {createClient} from '@supabase/supabase-js';

export type Database = {
  public: {
    Tables: {
      waitlist: {
        Row: {
          id: string;
          email: string;
          city: string | null;
          country: string | null;
          early_access: boolean;
          created_at: string;
        };
        Insert: {
          email: string;
          city?: string | null;
          country?: string | null;
          early_access?: boolean;
        };
      };
      survey_responses: {
        Row: {
          id: string;
          frequency: string;
          owned_puzzles: string;
          subscription_interest: string;
          created_at: string;
        };
        Insert: {
          frequency: string;
          owned_puzzles: string;
          subscription_interest: string;
        };
      };
    };
  };
};

export function getSupabaseBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey);
}
