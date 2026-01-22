import { z } from "zod";
const enhancedProductionSchema = z.object({
    name: z.string().min(1, "Production name is required"),
    images: z.array(z.instanceof(File)).max(3, "Maximum 3 images allowed").optional(),
    imageUrls: z.array(z.string()).optional(),
    videoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export const organisationEnhancedProfileSchema = z.object({
    founded_year: z.string().optional(),
    website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
    youtube: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
    keyPeople: z.array(z.object({
        name: z.string(),
        role: z.string(),
    })).optional(),
    pastProductions: z.array(enhancedProductionSchema).optional(),
    imagesToDelete: z.array(z.string()).optional(),
});

export type OrganisationEnhancedProfileData = z.infer<typeof organisationEnhancedProfileSchema>;
