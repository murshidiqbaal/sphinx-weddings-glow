import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kmpujnyqwggkeaaqtktj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttcHVqbnlxd2dna2VhYXF0a3RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NzM3NjIsImV4cCI6MjA3OTE0OTc2Mn0.CRoTDFro_Z7z3fV9jE_2NlBczHroELKvoyXBUnBrdfw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
