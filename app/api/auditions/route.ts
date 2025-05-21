import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";

// Add this GET handler to your existing file
export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    
    // Query auditions from your Supabase database
    const { data, error } = await supabase
      .from("auditions")
      .select("*");

    if (error) {
      console.error("Supabase query error:", error);
      return NextResponse.json(
        { error: "Failed to fetch auditions" }, 
        { status: 500 }
      );
    }

    // Return the auditions data as JSON
    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Error fetching audition data:", error);
    return NextResponse.json(
      { error: "Failed to fetch audition data" },
      { status: 500 }
    );
  }
}

// Your existing POST handler remains unchanged
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseServerClient();
    const auditions = await request.json();
    
    // Validate if input is an array
    if (!Array.isArray(auditions)) {
      return NextResponse.json(
        { error: "Invalid input, expected an array of auditions" },
        { status: 400 }
      );
    }

    // Process each audition entry
    const results = [];
    const errors = [];

    for (const audition of auditions) {
      // Ensure each entry has the required fields
      if (!audition.title || !audition.type || !audition.location) {
        errors.push({ 
          audition, 
          error: "Missing required fields (title, type, or location)" 
        });
        continue;
      }

      // Insert into the auditions table
      const { data, error } = await supabase
        .from("auditions")
        .insert(audition)
        .select();

      if (error) {
        errors.push({ audition, error: error.message });
      } else {
        results.push(data);
      }
    }

    // Return response with results and any errors
    return NextResponse.json({
      success: true,
      message: `Processed ${auditions.length} auditions with ${errors.length} errors`,
      results,
      errors: errors.length > 0 ? errors : null,
    });
  } catch (error) {
    console.error("Error processing audition data:", error);
    return NextResponse.json(
      { error: "Failed to process audition data" },
      { status: 500 }
    );
  }
}