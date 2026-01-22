import { MapPin, Mail, Instagram, Globe, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getSupabaseServerClientForRouteHandler } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { OrganisationData, OrganisationProfileView } from "@/features/organisation/components/OrganisationProfileView";

interface Organisation {
  profile_id: string;
  organisation_name: string;
  organisation_types: string[];
  city: string;
  state: string;
  country: string;
  primary_languages: string[];
  core_work: string[];
  contact_email: string;
  instagram: string | null;
  short_description: string | null;
  founded_year: number | null;
  website: string | null;
  youtube: string | null;
  created_at: string;
}

async function getOrganisationProfile(): Promise<Organisation | null> {
  const supabase = await getSupabaseServerClientForRouteHandler();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login"); // or handle auth error appropriately
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (profileError || !profile?.id) {
    return null;
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
    return null;
  }

  return organisation;
}

const OrganisationProfile = async () => {
  const organisation = await getOrganisationProfile();
  if (!organisation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No organisation profile found.</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto">
      <OrganisationProfileView organisation={organisation as OrganisationData} />
      <div className="mb-4 ml-4">
        <Link href="/organisations/profile/edit">
          <Button>
            Edit Profile
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default OrganisationProfile;