import { NextRequest, NextResponse } from "next/server";

import { cookies } from 'next/headers';
import { createServerClient } from "@supabase/auth-helpers-nextjs";

// Server-side Supabase client setup
function getSupabaseServerClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!, // Use SERVICE_ROLE_KEY if needed for protected queries
    {
      cookies: () => cookieStore,
    }
  );
}

// Helper function to validate service_role key
function validateServiceRole(request: NextRequest): boolean {
  const serviceRoleKey = request.headers.get("service_role");
 
  if (!serviceRoleKey) {
    console.error("Missing service_role key in request headers");
    return false;
  }

  const expectedKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  console.log("expectedkey",expectedKey);
  console.log("serviceRoleKey",serviceRoleKey);

  return serviceRoleKey === expectedKey;
}

// Add this GET handler to your existing file
export async function GET() {
  try {
    const supabase = getSupabaseServerClient();

    // Query auditions from your Supabase database
    const { data, error } = await supabase.from("auditions").select("*");

    if (error) {
      console.error("Supabase query error:", error);
      return NextResponse.json(
        { error: "Failed to fetch auditions" },
        { status: 500}
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

// POST handler
export async function POST(request: NextRequest) {
  if (!validateServiceRole(request)) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid service_role key" },
      { status: 401 }
    );
  }

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
          error: "Missing required fields (title, type, or location)",
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

// DELETE handler
export async function DELETE(request: NextRequest) {
  if (!validateServiceRole(request)) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid service_role key" },
      { status: 401 }
    );
  }

  try {
    const supabase = getSupabaseServerClient();
    const { id } = await request.json();

    // Validate if the ID is provided
    if (!id) {
      return NextResponse.json(
        { error: "Missing required field: id" },
        { status: 400 }
      );
    }

    // Delete the audition with the given ID
    const { error } = await supabase.from("auditions").delete().eq("id", id);

    if (error) {
      console.error("Supabase delete error:", error);
      return NextResponse.json(
        { error: "Failed to delete audition" },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: `Audition with ID ${id} deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting audition:", error);
    return NextResponse.json(
      { error: "Failed to delete audition" },
      { status: 500 }
    );
  }
}

// PUT handler
export async function PUT(request: NextRequest) {
  if (!validateServiceRole(request)) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid service_role key" },
      { status: 401 }
    );
  }

  try {
    const supabase = getSupabaseServerClient();
    const { id, ...updatedFields } = await request.json();

    // Validate if the ID is provided
    if (!id) {
      return NextResponse.json(
        { error: "Missing required field: id" },
        { status: 400 }
      );
    }

    // Validate if there are fields to update
    if (Object.keys(updatedFields).length === 0) {
      return NextResponse.json(
        { error: "No fields provided to update" },
        { status: 400 }
      );
    }

    // Update the audition with the given ID
    const { data, error } = await supabase
      .from("auditions")
      .update(updatedFields)
      .eq("id", id)
      .select();

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json(
        { error: "Failed to update audition" },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: `Audition with ID ${id} updated successfully`,
      data,
    });
  } catch (error) {
    console.error("Error updating audition:", error);
    return NextResponse.json(
      { error: "Failed to update audition" },
      { status: 500 }
    );
  }
}