# Supabase Auditions API Integration

This document provides instructions for setting up and using the Supabase auditions API integration.

## Setup Instructions

1. **Create a Supabase Project**
   - Sign up or log in at [Supabase](https://supabase.com)
   - Create a new project
   - Note your project URL and API keys

2. **Set Up Environment Variables**
   - Copy the `.env.example` file to `.env.local`
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   - Open `.env.local` and add your Supabase credentials:
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   \`\`\`

3. **Create the Auditions Table**
   - Go to your Supabase dashboard
   - Navigate to the SQL Editor
   - Run the following SQL to create the auditions table:

   \`\`\`sql
   CREATE TABLE auditions (
     id BIGINT PRIMARY KEY,
     title TEXT NOT NULL,
     type TEXT NOT NULL,
     location TEXT NOT NULL,
     state TEXT,
     date TEXT,
     director TEXT,
     description TEXT,
     company TEXT,
     companyLink TEXT,
     contact TEXT,
     contactType TEXT,
     experience TEXT,
     verified BOOLEAN DEFAULT false,
     image TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   \`\`\`

4. **Test Your Connection**
   - Run the test script to verify your Supabase connection:
   \`\`\`bash
   node scripts/test-supabase-connection.js
   \`\`\`

## API Usage

### Importing Auditions

You can import auditions using the provided API endpoint or script:

1. **Using the API Endpoint**
   
   Send a POST request to `/api/auditions` with an array of audition objects:

   \`\`\`bash
   curl -X POST http://localhost:3000/api/auditions \
     -H "Content-Type: application/json" \
     -d '[{"id":1,"title":"Sample Audition","type":"Commercial","location":"Mumbai",...}]'
   \`\`\`

2. **Using the Import Script**
   
   Edit `scripts/import-auditions.js` to include your audition data, then run:

   \`\`\`bash
   node scripts/import-auditions.js
   \`\`\`

### API Response Format

The API will respond with:

\`\`\`json
{
  "success": true,
  "message": "Processed X auditions with Y errors",
  "results": [...],
  "errors": null
}
\`\`\`

## Troubleshooting

If you encounter any issues:

1. Verify that your `.env.local` file contains the correct Supabase credentials
2. Ensure that the auditions table exists in your Supabase project
3. Check that your Supabase policies allow inserting data into the auditions table
