import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase';

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    
    // Query to get all tables from the public schema
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name, table_schema')
      .eq('table_schema', 'public')
      .order('table_name');

    if (error) {
      console.error('Error fetching tables:', error);
      return NextResponse.json(
        { error: 'Failed to fetch database tables', details: error.message },
        { status: 500 }
      );
    }

    // Alternative approach using raw SQL if the above doesn't work
    if (!data || data.length === 0) {
      const { data: sqlData, error: sqlError } = await supabase.rpc('get_all_tables');
      
      if (sqlError) {
        // Fallback: try direct SQL query
        const { data: directData, error: directError } = await supabase
          .from('pg_tables')
          .select('tablename, schemaname')
          .eq('schemaname', 'public');
          
        if (directError) {
          return NextResponse.json(
            { error: 'Failed to fetch database tables', details: directError.message },
            { status: 500 }
          );
        }
        
        return NextResponse.json({
          success: true,
          tables: directData?.map(table => ({
            table_name: table.tablename,
            table_schema: table.schemaname
          })) || []
        });
      }
      
      return NextResponse.json({
        success: true,
        tables: sqlData || []
      });
    }

    return NextResponse.json({
      success: true,
      tables: data
    });
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}