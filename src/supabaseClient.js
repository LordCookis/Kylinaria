import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://fygkskorgvtqqitnzwuy.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5Z2tza29yZ3Z0cXFpdG56d3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYyMjQwMzMsImV4cCI6MjAwMTgwMDAzM30.WORCBP6awiGITFlY8t9mv7gtCTDjT2f6fmYnvtLlfyo"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)