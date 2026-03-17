import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Determine env file (matches scripts/test-supabase-connection.js pattern)
const env = process.env.APP_ENV || 'dev';
const envFile = `.env.local.${env}`;
console.log(`Loading environment variables from ${envFile} ...`);
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }
  return createClient(supabaseUrl, supabaseKey);
}

function parseArgs() {
  const args = process.argv.slice(2);
  const fileArgIndex = args.indexOf('--file');
  if (fileArgIndex === -1 || !args[fileArgIndex + 1]) {
    console.error('Usage: node scripts/import-pincodes.js --file "C:\\path\\to\\data.json"');
    process.exit(1);
  }
  const file = args[fileArgIndex + 1];
  return { file };
}

function normalizeRecord(r) {
  const pincode = r.Pincode ? String(r.Pincode).trim() : null;
  return {
    post_office_name: r.PostOfficeName ? String(r.PostOfficeName).trim() : null,
    pincode: pincode && pincode.length === 6 ? pincode : pincode?.padStart(6, '0') ?? null,
    city: r.City ? String(r.City).trim() : null,
    district: r.District ? String(r.District).trim() : null,
    state: r.State ? String(r.State).trim() : null,
  };
}

async function importPincodes() {
  const { file } = parseArgs();
  const supabase = getSupabaseClient();

  console.log(`Reading JSON from ${file} ...`);
  const rawBuffer = fs.readFileSync(file);
  // Remove BOM and trim to avoid parse errors at position 0
  const raw = rawBuffer.toString('utf-8').replace(/^\uFEFF/, '').trim();
  let arr;
  try {
    arr = JSON.parse(raw);
  } catch (e) {
    // Fallback: attempt to fix common formatting issues (trailing commas)
    const cleaned = raw.replace(/,\s*]/g, ']').replace(/,\s*}/g, '}');
    try {
      arr = JSON.parse(cleaned);
    } catch {
      console.error('Failed to parse JSON. Ensure file contains a valid array of objects.');
      throw e;
    }
  }

  if (!Array.isArray(arr)) {
    console.error('Expected a JSON array of objects.');
    process.exit(1);
  }

  console.log(`Loaded ${arr.length} records. Normalizing ...`);
  const rows = arr.map(normalizeRecord).filter(r => r.post_office_name && r.pincode);
  console.log(`Prepared ${rows.length} valid rows (filtered invalid). Starting import ...`);

  const chunkSize = 1000; // safe batch size
  let success = 0;
  let failures = 0;

  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize);
    const { error, count } = await supabase
      .from('pincodes')
      .insert(chunk);

    if (error) {
      failures += chunk.length;
      console.error(`Batch ${i / chunkSize + 1} failed:`, error.message);
    } else {
      success += chunk.length;
      console.log(`Batch ${i / chunkSize + 1}: inserted ${chunk.length} rows`);
    }
  }

  console.log(`Import complete. Success: ${success}, Failures: ${failures}`);
}

importPincodes().catch(err => {
  console.error('Import error:', err);
  process.exit(1);
});