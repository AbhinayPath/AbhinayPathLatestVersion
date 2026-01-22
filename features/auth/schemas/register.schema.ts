import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
  profileType: z.enum(["artist", "technician", "organisation"]),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
