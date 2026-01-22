import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseServerClientForRouteHandler } from '@/lib/supabase-server'

const ORGANISATION_BASE_COMPLETION = 55

export async function POST(request: NextRequest) {
    try {
        const supabase = await getSupabaseServerClientForRouteHandler();

        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 }
            );
        }
        const body = await request.json();
        const {
            organisation_name,
            organisation_types,
            city,
            state,
            country,
            primary_languages,
            core_work,
            contact_email,
            instagram,
            short_description,
            profile_id,
        } = body;

        if (
            !organisation_name ||
            !organisation_types?.length ||
            !city ||
            !contact_email
        ) {
            return NextResponse.json(
                {
                    error:
                        "Missing required fields: organisation_name, organisation_types, city, contact_email",
                },
                { status: 400 }
            );
        }

        const { data: organisation, error: orgError } = await supabase
            .from("organisation_profiles")
            .insert({
                profile_id,
                organisation_name,
                organisation_types,
                city,
                state,
                country,
                primary_languages: primary_languages || [],
                core_work: core_work || [],
                contact_email,
                instagram,
                short_description,
            })
            .select()
            .single();


        if (orgError) {
            console.error("Organisation insert failed:", orgError);
            return NextResponse.json(
                { error: "Failed to create organisation" },
                { status: 500 }
            );
        }
        const { error: profileUpdateError } = await supabase
            .from("profiles")
            .update({
                completion_percentage: ORGANISATION_BASE_COMPLETION,
            })
            .eq("id", profile_id);

        return NextResponse.json(
            {
                success: true,
                message: "Organisation registered successfully",
                organisation,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("POST /api/organisations error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}