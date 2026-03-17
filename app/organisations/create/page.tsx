import { redirect } from "next/navigation";

export default function CreateOrganisationProfile() {
  redirect("/organisations/profile/edit");
}
