import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClientForRouteHandler } from "@/lib/supabase-server";
import { cookies } from "next/headers";

// GET - Fetch talent profiles (with optional filters)
export async function GET(request: NextRequest) {
  try {
    const supabase = await getSupabaseServerClientForRouteHandler();

    // Get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      console.error('GET /api/talent-profile: Unauthorized', authError);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch the talent profile for the user
    const { data, error } = await supabase
      .from('talent_profiles')
      .select(`
        *,
        education_records(*),
        experience_records(*),
        training_records(*),
        media_files(*)
      `)
      .eq('user_id', user.id)
      .single(); // Use single() to get one record or null

    if (error) {
        if (error.code === 'PGRST116') {
            // This code means no rows were found, which is not necessarily an error.
            // It could mean the user hasn't created a profile yet.
            return NextResponse.json(null, { status: 200 });
        }
      console.error('Error fetching talent profile:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('GET talent profile failed:', error);
    return NextResponse.json({ error: 'Failed to fetch talent profile' }, { status: 500 });
  }
}

// POST - Create new talent profile
export async function POST(request: NextRequest) {
  try {
    const { profile, education, experience, training, media } = await request.json();
    const supabase = await getSupabaseServerClientForRouteHandler();

    // Get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    console.log('🔐 Authenticated user:',user );
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Add user_id to profile data
    const profileData = {
      ...profile,
      user_id: user.id
    }

    // 1. Create the main talent profile
    const { data: createdProfile, error: profileError } = await supabase
      .from('talent_profiles')
      .insert([profileData])
      .select()
      .single();

    if (profileError) {
      console.error('Error creating talent profile:', profileError);
      return NextResponse.json({ error: profileError.message }, { status: 500 });
    }

    const profileId = createdProfile.id;

    // 2. Insert education records if any
    if (education && education.length > 0) {
      const educationData = education
        .filter((edu: any) => edu.institution || edu.degree) // Only insert if has data
        .map((edu: any) => ({
          ...edu,
          talent_profile_id: profileId
        }));

      if (educationData.length > 0) {
        const { error: educationError } = await supabase
          .from('education_records')
          .insert(educationData);

        if (educationError) {
          console.error('Error creating education records:', educationError);
          // Continue execution, don't fail the whole request
        }
      }
    }

    // 3. Insert experience records if any
    if (experience && experience.length > 0) {
      const experienceData = experience
        .filter((exp: any) => exp.project_title || exp.role) // Only insert if has data
        .map((exp: any) => ({
          ...exp,
          talent_profile_id: profileId
        }));

      if (experienceData.length > 0) {
        const { error: experienceError } = await supabase
          .from('experience_records')
          .insert(experienceData);

        if (experienceError) {
          console.error('Error creating experience records:', experienceError);
          // Continue execution, don't fail the whole request
        }
      }
    }

    // 4. Insert training records if any
    if (training && training.length > 0) {
      const trainingData = training
        .filter((train: any) => train.program_name || train.instructor) // Only insert if has data
        .map((train: any) => ({
          ...train,
          talent_profile_id: profileId
        }));

      if (trainingData.length > 0) {
        const { error: trainingError } = await supabase
          .from('training_records')
          .insert(trainingData);

        if (trainingError) {
          console.error('Error creating training records:', trainingError);
          // Continue execution, don't fail the whole request
        }
      }
    }

    // 5. Insert media files if any
    if (media && media.length > 0) {
      const mediaData = media
        .filter((file: any) => file.url) // Only insert if has URL
        .map((file: any) => ({
          ...file,
          talent_profile_id: profileId
        }));

      if (mediaData.length > 0) {
        const { error: mediaError } = await supabase
          .from('media_files')
          .insert(mediaData);

        if (mediaError) {
          console.error('Error creating media files:', mediaError);
          // Continue execution, don't fail the whole request
        }
      }
    }

    // 6. Fetch the complete profile with all related data
    const { data: completeProfile } = await supabase
      .from('talent_profiles')
      .select(`
        *,
        education_records(*),
        experience_records(*),
        training_records(*),
        media_files(*)
      `)
      .eq('id', profileId)
      .single();

    return NextResponse.json({ 
      success: true, 
      message: 'Talent profile created successfully',
      data: completeProfile
    });
  } catch (error) {
    console.error('POST talent profile failed:', error);
    return NextResponse.json({ error: 'Failed to create talent profile' }, { status: 500 });
  }
}

// PUT - Update talent profile
export async function PUT(request: NextRequest) {
  try {
    const { profile, education, experience, training, media } = await request.json();

   

    const supabase = await getSupabaseServerClientForRouteHandler();

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!profile.id) {
      return NextResponse.json({ error: 'Profile ID is required' }, { status: 400 });
    }

    // Verify ownership
    const { data: existingProfile, error: verifyError } = await supabase
      .from('talent_profiles')
      .select('user_id')
      .eq('id', profile.id)
      .single();

    if (verifyError || existingProfile.user_id !== user.id) {
      return NextResponse.json({ error: 'Unauthorized to update this profile' }, { status: 403 });
    }

    const profileId = profile.id;

    // 1. Update the main talent profile
    const { data: updatedProfile, error: profileError } = await supabase
      .from('talent_profiles')
      .update(profile)
      .eq('id', profileId)
      .select()
      .single();

    if (profileError) {
      console.error('Error updating talent profile:', profileError);
      return NextResponse.json({ error: profileError.message }, { status: 500 });
    }

    // 2. Update education records
    if (education !== undefined) {
      // Delete existing education records
      await supabase
        .from('education_records')
        .delete()
        .eq('talent_profile_id', profileId);

      // Insert new education records
      if (education.length > 0) {
        const educationData = education
          .filter((edu: any) => edu.institution || edu.degree)
          .map((edu: any) => ({
            ...edu,
            talent_profile_id: profileId
          }));

        if (educationData.length > 0) {
          const { error: educationError } = await supabase
            .from('education_records')
            .insert(educationData);

          if (educationError) {
            console.error('Error updating education records:', educationError);
          }
        }
      }
    }

    // 3. Update experience records
    if (experience !== undefined) {
      // Delete existing experience records
      await supabase
        .from('experience_records')
        .delete()
        .eq('talent_profile_id', profileId);

      // Insert new experience records
      if (experience.length > 0) {
        const experienceData = experience
          .filter((exp: any) => exp.project_title || exp.role)
          .map((exp: any) => ({
            ...exp,
            talent_profile_id: profileId
          }));

        if (experienceData.length > 0) {
          const { error: experienceError } = await supabase
            .from('experience_records')
            .insert(experienceData);

          if (experienceError) {
            console.error('Error updating experience records:', experienceError);
          }
        }
      }
    }

    // 4. Update training records
    if (training !== undefined) {
      // Delete existing training records
      await supabase
        .from('training_records')
        .delete()
        .eq('talent_profile_id', profileId);

      // Insert new training records
      if (training.length > 0) {
        const trainingData = training
          .filter((train: any) => train.program_name || train.instructor)
          .map((train: any) => ({
            ...train,
            talent_profile_id: profileId
          }));

        if (trainingData.length > 0) {
          const { error: trainingError } = await supabase
            .from('training_records')
            .insert(trainingData);

          if (trainingError) {
            console.error('Error updating training records:', trainingError);
          }
        }
      }
    }

    // 5. Update media files
    if (media !== undefined) {
      // Delete existing media files
      await supabase
        .from('media_files')
        .delete()
        .eq('talent_profile_id', profileId);

      // Insert new media files
      if (media.length > 0) {
        const mediaData = media
          .filter((file: any) => file.url)
          .map((file: any) => ({
            ...file,
            talent_profile_id: profileId
          }));

        if (mediaData.length > 0) {
          const { error: mediaError } = await supabase
            .from('media_files')
            .insert(mediaData);

          if (mediaError) {
            console.error('Error updating media files:', mediaError);
          }
        }
      }
    }

    // 6. Fetch the complete updated profile with all related data
    const { data: completeProfile } = await supabase
      .from('talent_profiles')
      .select(`
        *,
        education_records(*),
        experience_records(*),
        training_records(*),
        media_files(*)
      `)
      .eq('id', profileId)
      .single();

    return NextResponse.json({ 
      success: true, 
      message: 'Talent profile updated successfully',
      data: completeProfile
    });
  } catch (error) {
    console.error('PUT talent profile failed:', error);
    return NextResponse.json({ error: 'Failed to update talent profile' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const profileId = searchParams.get('id');

    if (!profileId) {
      return NextResponse.json({ error: 'Profile ID is required' }, { status: 400 });
    }

    
    const supabase = await getSupabaseServerClientForRouteHandler();

    // Get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify ownership
    const { data: existingProfile, error: verifyError } = await supabase
      .from('talent_profiles')
      .select('user_id')
      .eq('id', profileId)
      .single();

    if (verifyError || existingProfile.user_id !== user.id) {
      return NextResponse.json({ error: 'Unauthorized to delete this profile' }, { status: 403 });
    }

    // Delete related records first (if cascade is not set up)
    // 1. Delete education records
    await supabase
      .from('education_records')
      .delete()
      .eq('talent_profile_id', profileId);

    // 2. Delete experience records
    await supabase
      .from('experience_records')
      .delete()
      .eq('talent_profile_id', profileId);

    // 3. Delete training records
    await supabase
      .from('training_records')
      .delete()
      .eq('talent_profile_id', profileId);

    // 4. Delete media files
    await supabase
      .from('media_files')
      .delete()
      .eq('talent_profile_id', profileId);

    // 5. Finally delete the main profile
    const { error: deleteError } = await supabase
      .from('talent_profiles')
      .delete()
      .eq('id', profileId);

    if (deleteError) {
      console.error('Error deleting talent profile:', deleteError);
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Talent profile and all related data deleted successfully'
    });
  } catch (error) {
    console.error('DELETE talent profile failed:', error);
    return NextResponse.json({ error: 'Failed to delete talent profile' }, { status: 500 });
  }
}
