"use client"
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Building2,
    MapPin,
    Globe,
    Mail,
    Instagram,
    FileText,
    Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/FormField";
import { RegistrationFormData, registrationSchema } from "../schema/registrationschema";
import { CORE_AREAS, ORGANIZATION_TYPES, PRIMARY_LANGUAGES } from "@/constants/organization.constants";
import { MultiSelect } from "@/components/multi-select";

export function OrganisationRegistrationForm({ handleFormSubmit, isSubmitting }: { handleFormSubmit: (data: RegistrationFormData) => void, isSubmitting: boolean }) {
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<RegistrationFormData>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            organisation_name: "",
            organisation_types: [],
            city: "",
            state: "",
            country: "",
            primary_languages: [],
            core_work: [],
            contact_email: "",
            instagram: "",
            short_description: "",
        },
    });

    const shortDescription = watch("short_description") || "";
    const characterCount = shortDescription.length;


    const onSubmit = (data: RegistrationFormData) => {
        console.log("Form data:", data);
        handleFormSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Organization Name */}
            <FormField
                label="Organisation Name"
                required
                error={errors.organisation_name?.message}
            >
                <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        {...register("organisation_name")}
                        placeholder="Enter your organisation name"
                        className="pl-10"
                    />
                </div>
            </FormField>

            {/* Organization Type */}
            <FormField
                label="Organisation Type"
                required
                error={errors.organisation_types?.message}
            >
                <Controller
                    name="organisation_types"
                    control={control}
                    render={({ field }) => (
                        <MultiSelect
                            options={ORGANIZATION_TYPES}
                            selected={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
            </FormField>

            {/* Location Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                <FormField label="City" required error={errors.city?.message}>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            {...register("city")}
                            placeholder="City"
                            className="pl-10"
                        />
                    </div>
                </FormField>

                <FormField label="State" required error={errors.state?.message}>
                    <Input {...register("state")} placeholder="State" />
                </FormField>

                <FormField
                    label="Country"
                    required
                    error={errors.country?.message}
                >
                    <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            {...register("country")}
                            placeholder="Country"
                            className="pl-10"
                        />
                    </div>
                </FormField>
            </div>

            {/* Primary Languages */}
            <FormField
                label="Primary Language(s)"
                required
                error={errors.primary_languages?.message}
            >
                <Controller
                    name="primary_languages"
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                        <MultiSelect
                            options={PRIMARY_LANGUAGES}
                            selected={field.value}
                            onChange={field.onChange}
                            placeholder="Select languages"
                        />
                    )}
                />
            </FormField>

            {/* Core Areas */}
            <FormField
                label="Core Area of Work"
                required
                error={errors.core_work?.message}
            >
                <Controller
                    name="core_work"
                    control={control}
                    render={({ field }) => (
                        <MultiSelect
                            options={CORE_AREAS}
                            selected={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
            </FormField>

            {/* Contact Email */}
            <FormField
                label="Contact Email"
                required
                error={errors.contact_email?.message}
            >
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        {...register("contact_email")}
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10"
                    />
                </div>
            </FormField>


            {/* Instagram Link */}
            <FormField
                label="Instagram Link"
                error={errors.instagram?.message}
            >
                <div className="relative">
                    <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        {...register("instagram")}
                        placeholder="https://instagram.com/yourhandle"
                        className="pl-10"
                    />
                </div>
            </FormField>

            {/* Short Description */}
            <FormField
                label="Short Description"
                error={errors.short_description?.message}
                hint={`${characterCount}/300 characters`}
            >
                <div className="relative">
                    <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Textarea
                        {...register("short_description")}
                        placeholder="Tell us briefly about your organisation..."
                        className="pl-10 min-h-[100px] resize-none"
                        maxLength={300}
                    />
                </div>
            </FormField>

            {/* Submit Button */}
            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Registering...
                    </>
                ) : (
                    "Complete Registration"
                )}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
                By registering, you agree to our Terms of Service and Privacy Policy.
            </p>
        </form>
    );
}
