import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Determine which env file to load (default to dev)
const env = process.env.APP_ENV || 'dev'; // or use NODE_ENV if you prefer
const envFile = `.env.local.${env}`;

console.log(`Loading environment variables from ${envFile} ...`);

// Load the chosen env file
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

async function testConnection() {
  try {
    console.log("🔄 Testing Supabase connection...");

    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("❌ Missing Supabase credentials in environment variables.\n");
      console.log("👉 Fix: Ensure your env file includes:");
      console.log("SUPABASE_URL=...");
      console.log("SUPABASE_SERVICE_ROLE_KEY=... (for server scripts)\n");
      console.log("OR run directly with:");
      console.log("SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/test-supabase-connection.js\n");
      process.exit(1);
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from('auditions')
      .select('*')
      .limit(1);

    if (error) {
      console.error("❌ Connection failed:", error.message);
      return;
    }

    console.log("✅ Successfully connected to Supabase!");
    console.log(`🔢 Sample data from "auditions":`, data);
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

// Run the test
testConnection();
