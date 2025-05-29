import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

// Initialize Supabase server client
function getSupabaseServerClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: () => cookieStore,
    }
  );
}

// Validate service role key from headers
function validateServiceRole(request: NextRequest): boolean {
  const serviceRoleKey = request.headers.get("service_role");
  const expectedKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey || serviceRoleKey !== expectedKey) {
    console.error("Unauthorized: Invalid or missing service_role key");
    return false;
  }

  return true;
}

// GET handler - Fetch all auditions
export async function GET() {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase.from("auditions").select("*");

    if (error) {
      console.error("Supabase query error:", error);
      return NextResponse.json({ error: "Failed to fetch auditions" }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("Server error fetching auditions:", error);
    return NextResponse.json({ error: "Failed to fetch audition data" }, { status: 500 });
  }
}

// POST handler - Insert multiple auditions
export async function POST(request: NextRequest) {
  if (!validateServiceRole(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = getSupabaseServerClient();
    const auditions = await request.json();

    if (!Array.isArray(auditions)) {
      return NextResponse.json({ error: "Input should be an array" }, { status: 400 });
    }

    const results = [];
    const errors = [];

    for (const audition of auditions) {
      const { title, type, location } = audition;
      if (!title || !type || !location) {
        errors.push({ audition, error: "Missing required fields" });
        continue;
      }

      const { data, error } = await supabase.from("auditions").insert(audition).select();
      if (error) errors.push({ audition, error: error.message });
      else results.push(data);
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${auditions.length} entries, ${errors.length} failed.`,
      results,
      errors: errors.length ? errors : null,
    });
  } catch (error) {
    console.error("Server error in POST:", error);
    return NextResponse.json({ error: "Failed to process auditions" }, { status: 500 });
  }
}

// DELETE handler - Delete an audition by ID
export async function DELETE(request: NextRequest) {
  if (!validateServiceRole(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = getSupabaseServerClient();
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    const { error } = await supabase.from("auditions").delete().eq("id", id);
    if (error) {
      console.error("Delete error:", error);
      return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: `Deleted audition with ID ${id}` });
  } catch (error) {
    console.error("Server error in DELETE:", error);
    return NextResponse.json({ error: "Failed to delete audition" }, { status: 500 });
  }
}

// PUT handler - Update an audition by ID
export async function PUT(request: NextRequest) {
  if (!validateServiceRole(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = getSupabaseServerClient();
    const { id, ...fieldsToUpdate } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    if (!Object.keys(fieldsToUpdate).length) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    const { data, error } = await supabase.from("auditions").update(fieldsToUpdate).eq("id", id).select();
    if (error) {
      console.error("Update error:", error);
      return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Updated audition with ID ${id}`,
      data,
    });
  } catch (error) {
    console.error("Server error in PUT:", error);
    return NextResponse.json({ error: "Failed to update audition" }, { status: 500 });
  }
}
