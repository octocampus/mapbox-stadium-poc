import { createClient} from "@supabase/supabase-js";

const apiUrl =  "https://kowvtgcgggmyuzttudco.supabase.co"
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtvd3Z0Z2NnZ2dteXV6dHR1ZGNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA3Mjk1MjAsImV4cCI6MjAyNjMwNTUyMH0.vSgrUHrPGWdsFDZd8C3QFPPy3J3uo3DnsUuj9Ovi_S0"

export const supabaseClient = createClient(apiUrl,apiKey);