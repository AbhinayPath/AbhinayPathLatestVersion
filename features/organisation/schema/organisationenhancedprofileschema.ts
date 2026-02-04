import { z } from "zod";
export const urlSchema = z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
        (val) => {
            if (!val || val === "") return true;
            // Accept URLs with or without protocol
            const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
            return urlPattern.test(val);
        },
        { message: "Please enter a valid URL" }
    );

const enhancedProductionSchema = z.object({
    name: z.string().min(1, "Production name is required"),
    images: z.array(z.instanceof(File)).max(3, "Maximum 3 images allowed").optional(),
    imageUrls: z.array(z.string()).optional(),
    videoUrl: urlSchema,
});

export const organisationEnhancedProfileSchema = z.object({
    founded_year: z.string().optional(),
    website: urlSchema,
    youtube: urlSchema,
    keyPeople: z.array(z.object({
        name: z.string(),
        role: z.string(),
    })).optional(),
    pastProductions: z.array(enhancedProductionSchema).optional(),
    imagesToDelete: z.array(z.string()).optional(),
});

export type OrganisationEnhancedProfileData = z.infer<typeof organisationEnhancedProfileSchema>;
