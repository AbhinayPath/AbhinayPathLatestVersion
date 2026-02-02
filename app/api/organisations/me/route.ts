import { getSupabaseServerClientForRouteHandler } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await getSupabaseServerClientForRouteHandler();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (profileError || !profile?.id) {
      throw new Error("Profile not found for user");
    }

    const { data: organisation, error: orgError } = await supabase
      .from("organisation_profiles")
      .select(`
        *,
        organisation_key_people(*),
        organisation_past_productions(*)
      `)
      .eq("profile_id", profile.id)
      .single();


    if (orgError || !organisation) {
      throw new Error("Organisation not found for profile");
    }


    return NextResponse.json({ organisation });
  } catch (error) {
    console.error("GET /api/organisations/me error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}



export async function PUT(req: NextRequest) {
  try {
    const supabase = await getSupabaseServerClientForRouteHandler();
    const formData = await req.formData();

    console.log("=== FormData received ===");

    // Log all form data keys
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: File - ${value.name} (${value.size} bytes)`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    // Authenticate user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (profileError || !profile?.id) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Check if organisation exists
    const { data: organisation, error: orgError } = await supabase
      .from("organisation_profiles")
      .select("profile_id")
      .eq("profile_id", profile.id)
      .single();

    if (orgError || !organisation) {
      return NextResponse.json(
        { error: "Organisation not found" },
        { status: 404 }
      );
    }

    // Parse form data
    const dataStr = formData.get("data") as string;
    const data = JSON.parse(dataStr);
    console.log("Parsed data:", data);

    const productionsStr = formData.get("productions") as string;
    const productions = JSON.parse(productionsStr);
    console.log("Parsed productions:", productions);

    const imagesToDeleteStr = formData.get("imagesToDelete") as string;
    const imagesToDelete = imagesToDeleteStr ? JSON.parse(imagesToDeleteStr) : [];
    console.log("Images to delete:", imagesToDelete);

    // 1. Delete old images from storage if specified
    if (imagesToDelete.length > 0) {
      const filePaths = imagesToDelete.map((url: string) => {
        // Extract file path from URL
        const urlParts = url.split('/');
        const bucketIndex = urlParts.findIndex(part => part === 'organisation-productions');
        return urlParts.slice(bucketIndex + 1).join('/');
      });

      console.log("Deleting files:", filePaths);
      const { error: deleteError } = await supabase.storage
        .from('organisation-productions')
        .remove(filePaths);

      if (deleteError) {
        console.error("Error deleting images:", deleteError);
      }
    }

    // 2. Update organisation profile
    const { error: updateOrgError } = await supabase
      .from("organisation_profiles")
      .update({
        organisation_name: data.organisation_name,
        organisation_types: data.organisation_types,
        city: data.city,
        state: data.state,
        country: data.country,
        primary_languages: data.primary_languages,
        core_work: data.core_work,
        contact_email: data.contact_email,
        instagram: data.instagram,
        short_description: data.short_description,
        founded_year: data.founded_year,
        website: data.website,
        youtube: data.youtube,
      })
      .eq("profile_id", profile.id);

    if (updateOrgError) {
      console.error("Error updating organisation:", updateOrgError);
      throw updateOrgError;
    }

    // 3. Update key people
    await supabase
      .from("organisation_key_people")
      .delete()
      .eq("profile_id", profile.id);

    if (Array.isArray(data.keyPeople) && data.keyPeople.length > 0) {
      const keyPeopleRows = data.keyPeople.map((p: any) => ({
        profile_id: profile.id,
        name: p.name,
        role: p.role,
      }));

      const { error } = await supabase
        .from("organisation_key_people")
        .insert(keyPeopleRows);

      if (error) {
        console.error("Error inserting key people:", error);
        throw error;
      }
    }

    // 4. Handle past productions with image uploads
    await supabase
      .from("organisation_past_productions")
      .delete()
      .eq("profile_id", profile.id);

    if (Array.isArray(productions) && productions.length > 0) {
      const productionRows = [];

      for (let i = 0; i < productions.length; i++) {
        const production = productions[i];
        const imageUrls = [...(production.existingImageUrls || [])];
        console.log(`Production ${i} - existing images:`, imageUrls);

        // Upload new images for this production
        if (production.newImagesCount > 0) {
          console.log(`Production ${i} - expecting ${production.newImagesCount} new images`);

          const imageFiles: File[] = [];

          // Collect all files for this production
          formData.forEach((value, key) => {
            if (key === `production_${i}_images` && value instanceof File) {
              imageFiles.push(value);
            }
          });

          console.log(`Production ${i} - found ${imageFiles.length} files:`, imageFiles.map(f => f.name));

          // Upload each file
          for (const file of imageFiles) {
            try {
              const fileExt = file.name.split('.').pop();
              const fileName = `${profile.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

              // Convert File to ArrayBuffer for upload
              const arrayBuffer = await file.arrayBuffer();
              const buffer = new Uint8Array(arrayBuffer);

              console.log(`Uploading file: ${fileName}, size: ${buffer.length} bytes`);

              const { data: uploadData, error: uploadError } = await supabase.storage
                .from('organisation-productions')
                .upload(fileName, buffer, {
                  contentType: file.type,
                  cacheControl: '3600',
                  upsert: false
                });

              if (uploadError) {
                console.error('Upload error:', uploadError);
                throw uploadError;
              }

              console.log('Upload successful:', uploadData);

              // Get public URL
              const { data: { publicUrl } } = supabase.storage
                .from('organisation-productions')
                .getPublicUrl(fileName);

              console.log('Public URL:', publicUrl);
              imageUrls.push(publicUrl);
            } catch (uploadErr) {
              console.error('Error uploading file:', file.name, uploadErr);
              throw uploadErr;
            }
          }
        }

        console.log(`Production ${i} - final image URLs:`, imageUrls);

        productionRows.push({
          profile_id: profile.id,
          name: production.name,
          video_url: production.videoUrl || null,
          image_urls: imageUrls,
        });
      }

      console.log("Inserting production rows:", productionRows);

      const { error: insertError } = await supabase
        .from("organisation_past_productions")
        .insert(productionRows);

      if (insertError) {
        console.error("Error inserting productions:", insertError);
        throw insertError;
      }
    }

    console.log("=== Update successful ===");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT /api/organisations/me error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
