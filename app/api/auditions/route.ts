import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const AUDITIONS_API = `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/auditions`;

// Helper: validate service_role key in headers
function validateServiceRole(request: NextRequest) {
  const key = request.headers.get("service_role");
  return key === SUPABASE_SERVICE_ROLE_KEY;
}

// Helper: standard headers for anon access (GET)
const anonHeaders = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  "Content-Type": "application/json",
};

// Helper: headers for service_role access (POST, PUT, DELETE)
const serviceRoleHeaders = {
  apikey: SUPABASE_SERVICE_ROLE_KEY,
  Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
  "Content-Type": "application/json",
};

// GET handler — fetch auditions (public read)
export async function GET() {
  try {
    const res = await fetch(`${AUDITIONS_API}?select=*`, {
      headers: anonHeaders,
    });

    console.log("GET auditions response:", res);
    if (!res.ok) {
      const error = await res.json();
      console.error("GET auditions error:", error);
      return NextResponse.json({ error }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("GET auditions failed:", err);
    return NextResponse.json({ error: "Failed to fetch auditions" }, { status: 500 });
  }
}

// POST handler — add auditions (protected)
export async function POST(request: NextRequest) {
  if (!validateServiceRole(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const auditions = await request.json();

    if (!Array.isArray(auditions)) {
      return NextResponse.json({ error: "Expected array of auditions" }, { status: 400 });
    }

    const results = [];
    const errors = [];

    for (const audition of auditions) {
      if (!audition.title || !audition.type || !audition.location) {
        errors.push({ audition, error: "Missing title, type, or location" });
        continue;
      }

      const res = await fetch(AUDITIONS_API, {
        method: "POST",
        headers: serviceRoleHeaders,
        body: JSON.stringify(audition),
      });

      if (!res.ok) {
        const error = await res.json();
        errors.push({ audition, error });
      } else {
        const data = await res.json();
        results.push(...data);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${auditions.length} auditions with ${errors.length} errors`,
      results,
      errors: errors.length > 0 ? errors : null,
    });
  } catch (err) {
    console.error("POST auditions failed:", err);
    return NextResponse.json({ error: "Failed to add auditions" }, { status: 500 });
  }
}

// DELETE handler — delete audition by id (protected)
export async function DELETE(request: NextRequest) {
  if (!validateServiceRole(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const res = await fetch(`${AUDITIONS_API}?id=eq.${id}`, {
      method: "DELETE",
      headers: serviceRoleHeaders,
    });

    if (!res.ok) {
      const error = await res.json();
      console.error("DELETE audition error:", error);
      return NextResponse.json({ error }, { status: res.status });
    }

    return NextResponse.json({ success: true, message: `Deleted audition with ID ${id}` });
  } catch (err) {
    console.error("DELETE auditions failed:", err);
    return NextResponse.json({ error: "Failed to delete audition" }, { status: 500 });
  }
}

// PUT handler — update audition by id (protected)
export async function PUT(request: NextRequest) {
  if (!validateServiceRole(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, ...updates } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    const res = await fetch(`${AUDITIONS_API}?id=eq.${id}`, {
      method: "PATCH",
      headers: serviceRoleHeaders,
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error("PUT audition error:", error);
      return NextResponse.json({ error }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({
      success: true,
      message: `Updated audition with ID ${id}`,
      data,
    });
  } catch (err) {
    console.error("PUT auditions failed:", err);
    return NextResponse.json({ error: "Failed to update audition" }, { status: 500 });
  }
}
