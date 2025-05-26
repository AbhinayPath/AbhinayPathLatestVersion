// A simple script to test Supabase connection
// To use: node scripts/test-supabase-connection.js


import { createClient } from '@supabase/supabase-js';

async function testConnection() {
  try {
    console.log("Testing Supabase connection...");
    
    // Manually set the Supabase credentials from your .env.local
    // Replace these with your actual values from .env.local
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.error("❌ Missing Supabase credentials in environment variables");
      console.log("\nYou need to manually set the environment variables before running this script.");
      console.log("Run this command with environment variables:");
      console.log("SUPABASE_URL=your_url SUPABASE_SERVICE_ROLE_KEY=your_key node scripts/test-supabase-connection.js");
      return;
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Simple query to verify connection
    const { data, error } = await supabase
      .from('auditions')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error("❌ Connection failed:", error);
      return;
    }
    
    console.log("✅ Successfully connected to Supabase!");
    console.log("Your auditions table is available and ready to use.");
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

// Run the test
testConnection();