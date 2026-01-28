import { CORE_AREAS, ORGANIZATION_TYPES, PRIMARY_LANGUAGES } from "@/constants/organization.constants";
import { z } from "zod";
import { urlSchema } from "./organisationenhancedprofileschema";

export const registrationSchema = z.object({
  organisation_name: z
    .string()
    .min(2, "Organization name must be at least 2 characters")
    .max(100, "Organization name must be less than 100 characters"),
  organisation_types: z
    .array(z.enum(ORGANIZATION_TYPES))
    .min(1, "Please select at least one organization type"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  country: z.string().min(2, "Country is required"),
  primary_languages: z
    .array(z.enum(PRIMARY_LANGUAGES))
    .min(1, "Please select at least one language"),
  core_work: z
    .array(z.enum(CORE_AREAS))
    .min(1, "Please select at least one core area"),
  contact_email: z.string().email("Please enter a valid email address"),
  instagram: urlSchema,
  short_description: z
    .string()
    .max(300, "Short description must be less than 300 characters")
    .optional(),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

// instagram: z.preprocess(
//   (val) => (val === "" ? undefined : val),
//   z.string().url("Please enter a valid URL").optional()
// ),