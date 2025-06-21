
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://btpdyrbmhrcjczxaqjvu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0cGR5cmJtaHJjamN6eGFxanZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzNzM3NTQsImV4cCI6MjA2NDk0OTc1NH0.p-cxbHyZZQ5ThkmArtKcGvTa1rhgdoTYZVCYwdT2bpM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
