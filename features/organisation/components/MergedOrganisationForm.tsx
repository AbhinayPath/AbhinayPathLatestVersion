"use client"
import { z } from "zod";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Building2,
    MapPin,
    Globe,
    Mail,
    Instagram,
    FileText,
    Loader2,
    Youtube,
    Plus,
    X,
    Sparkles,
    Upload,
    Link,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/FormField";
import { Label } from "@/components/ui/label";
import { CORE_AREAS, ORGANIZATION_TYPES, PRIMARY_LANGUAGES } from "@/constants/organization.constants";
import { MultiSelect } from "@/components/multi-select";
import { registrationSchema } from "../schema/registrationschema";
import { organisationEnhancedProfileSchema } from "../schema/organisationenhancedprofileschema";
import { useEffect, useState } from "react";

export const mergedOrganisationSchema = registrationSchema.merge(organisationEnhancedProfileSchema);

export type MergedOrganisationFormData = z.infer<typeof mergedOrganisationSchema>;

export function MergedOrganisationForm({
    handleFormSubmit,
    isSubmitting,
    initialData,
    profileId
}: {
    handleFormSubmit: (data: MergedOrganisationFormData) => void;
    isSubmitting: boolean;
    initialData: MergedOrganisationFormData;
    profileId: string;
}) {
    const [productionImagePreviews, setProductionImagePreviews] = useState<{
        [key: number]: { url: string; isExisting: boolean }[];
    }>({});

    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm<MergedOrganisationFormData>({
        resolver: zodResolver(mergedOrganisationSchema),
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
            founded_year: "",
            website: "",
            youtube: "",
            keyPeople: [],
            pastProductions: [],
        },
    });

    // Initialize form with existing data and set up image previews
    useEffect(() => {
        if (initialData) {
            console.log("initialData", initialData);
            reset(initialData);
            
            // Set up previews for existing images
            if (initialData.pastProductions) {
                const previews: { [key: number]: { url: string; isExisting: boolean }[] } = {};
                initialData.pastProductions.forEach((prod, index) => {
                    if (prod.imageUrls && prod.imageUrls.length > 0) {
                        previews[index] = prod.imageUrls.map(url => ({
                            url,
                            isExisting: true
                        }));
                    }
                });
                setProductionImagePreviews(previews);
            }
        }
    }, [initialData, reset]);

    const {
        fields: keyPeopleFields,
        append: appendPerson,
        remove: removePerson,
    } = useFieldArray({
        control,
        name: "keyPeople",
    });

    const {
        fields: productionFields,
        append: appendProduction,
        remove: removeProduction,
    } = useFieldArray({
        control,
        name: "pastProductions",
    });

    const shortDescription = watch("short_description") || "";
    const characterCount = shortDescription.length;

    const handleImageUpload = (index: number, files: FileList | null) => {
        if (!files) return;

        const currentPreviews = productionImagePreviews[index] || [];
        const currentImages = watch(`pastProductions.${index}.images`) || [];
        const currentImageUrls = watch(`pastProductions.${index}.imageUrls`) || [];

        const totalImages = currentPreviews.length;
        const availableSlots = 3 - totalImages;

        if (availableSlots <= 0) {
            alert("Maximum 3 images allowed per production");
            return;
        }

        const newFiles = Array.from(files).slice(0, availableSlots);
        const updatedImages = [...currentImages, ...newFiles];
        setValue(`pastProductions.${index}.images`, updatedImages);

        // Create previews for new files
        const newPreviews = newFiles.map(file => ({
            url: URL.createObjectURL(file),
            isExisting: false
        }));

        setProductionImagePreviews(prev => ({
            ...prev,
            [index]: [...currentPreviews, ...newPreviews],
        }));
    };

    const removeImage = (productionIndex: number, imageIndex: number) => {
        const currentPreviews = productionImagePreviews[productionIndex] || [];
        const imageToRemove = currentPreviews[imageIndex];

        if (imageToRemove.isExisting) {
            // It's an existing image - add to deletion list
            const currentImagesToDelete = watch('imagesToDelete') || [];
            const currentImageUrls = watch(`pastProductions.${productionIndex}.imageUrls`) || [];
            
            setValue('imagesToDelete', [...currentImagesToDelete, imageToRemove.url]);
            
            // Remove from imageUrls
            const updatedImageUrls = currentImageUrls.filter((_, i) => i !== imageIndex);
            setValue(`pastProductions.${productionIndex}.imageUrls`, updatedImageUrls);
        } else {
            // It's a new file - remove from images array
            const currentImages = watch(`pastProductions.${productionIndex}.images`) || [];
            const newImageIndex = currentPreviews.slice(0, imageIndex).filter(p => !p.isExisting).length;
            const updatedImages = currentImages.filter((_, i) => i !== newImageIndex);
            setValue(`pastProductions.${productionIndex}.images`, updatedImages);
            
            // Revoke object URL to prevent memory leaks
            URL.revokeObjectURL(imageToRemove.url);
        }

        // Update previews
        const updatedPreviews = currentPreviews.filter((_, i) => i !== imageIndex);
        setProductionImagePreviews(prev => ({
            ...prev,
            [productionIndex]: updatedPreviews,
        }));
    };

    const onSubmit = (data: MergedOrganisationFormData) => {
        console.log("Form data being submitted:", data);
        handleFormSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto md:p-6">
            {/* ========== BASIC REGISTRATION SECTION ========== */}
            <div className="space-y-6">
                <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    <h2 className="text-2xl font-bold">Basic Information</h2>
                </div>

                <FormField
                    label="Organization Name"
                    error={errors.organisation_name?.message}
                    required
                >
                    <Input
                        id="organisation_name"
                        placeholder="Enter your organization name"
                        {...register("organisation_name")}
                    />
                </FormField>

                <FormField
                    label="Organization Type"
                    error={errors.organisation_types?.message}
                    required
                >
                    <Controller
                        name="organisation_types"
                        control={control}
                        render={({ field }) => (
                            <MultiSelect
                                options={ORGANIZATION_TYPES}
                                selected={field.value || []}
                                onChange={field.onChange}
                                placeholder="Select organization types"
                            />
                        )}
                    />
                </FormField>

                <div className="grid gap-6 md:grid-cols-3">
                    <FormField label="City" error={errors.city?.message} required>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input id="city" placeholder="City" className="pl-10" {...register("city")} />
                        </div>
                    </FormField>

                    <FormField label="State/Province" error={errors.state?.message} required>
                        <Input id="state" placeholder="State" {...register("state")} />
                    </FormField>

                    <FormField label="Country" error={errors.country?.message} required>
                        <Input id="country" placeholder="Country" {...register("country")} />
                    </FormField>
                </div>

                <FormField
                    label="Primary Languages"
                    error={errors.primary_languages?.message}
                    required
                >
                    <Controller
                        name="primary_languages"
                        control={control}
                        render={({ field }) => (
                            <MultiSelect
                                options={PRIMARY_LANGUAGES}
                                selected={field.value || []}
                                onChange={field.onChange}
                                placeholder="Select languages"
                            />
                        )}
                    />
                </FormField>

                <FormField
                    label="Core Areas of Work"
                    error={errors.core_work?.message}
                    required
                >
                    <Controller
                        name="core_work"
                        control={control}
                        render={({ field }) => (
                            <MultiSelect
                                options={CORE_AREAS}
                                selected={field.value || []}
                                onChange={field.onChange}
                                placeholder="Select core areas"
                            />
                        )}
                    />
                </FormField>

                <FormField
                    label="Contact Email"
                    error={errors.contact_email?.message}
                    required
                >
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            id="contact_email"
                            type="email"
                            placeholder="contact@organization.com"
                            className="pl-10"
                            {...register("contact_email")}
                        />
                    </div>
                </FormField>

                <FormField label="Instagram Handle" error={errors.instagram?.message}>
                    <div className="relative">
                        <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            id="instagram"
                            placeholder="@yourorganization"
                            className="pl-10"
                            {...register("instagram")}
                        />
                    </div>
                </FormField>

                <FormField
                    label="Short Description"
                    error={errors.short_description?.message}
                    required
                >
                    <div className="space-y-2">
                        <div className="relative">
                            <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                            <Textarea
                                id="short_description"
                                placeholder="Brief description of your organization (max 500 characters)"
                                className="pl-10 min-h-32 resize-none"
                                maxLength={500}
                                {...register("short_description")}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground text-right">
                            {characterCount}/500 characters
                        </p>
                    </div>
                </FormField>
            </div>

            <div className="flex items-center gap-2" id="enhanced-profile">
                <Sparkles className="w-4 h-4 text-gold" />
                <span className="text font-medium">Enhanced Profile</span>
                <div className="flex-1 h-px bg-border" />
            </div>

            <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                        <Label htmlFor="founded_year">Founded Year</Label>
                        <Input id="founded_year" placeholder="e.g., 2015" {...register("founded_year")} />
                        {errors.founded_year && (
                            <p className="text-sm text-red-500">{errors.founded_year.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <div className="relative">
                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                id="website"
                                placeholder="https://..."
                                className="pl-10"
                                {...register("website")}
                            />
                        </div>
                        {errors.website && <p className="text-sm text-red-500">{errors.website.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="youtube">YouTube</Label>
                        <div className="relative">
                            <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                id="youtube"
                                placeholder="https://youtube.com/..."
                                className="pl-10"
                                {...register("youtube")}
                            />
                        </div>
                        {errors.youtube && <p className="text-sm text-red-500">{errors.youtube.message}</p>}
                    </div>
                </div>

                <section className="space-y-4 border rounded-lg p-6 bg-card">
                    <div className="flex items-center justify-between">
                        <Label className="text-base font-semibold">Key People</Label>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => appendPerson({ name: "", role: "" })}
                        >
                            <Plus className="w-4 h-4" />
                           <span className="hidden md:inline md:ml-2"> Add Person</span>
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {keyPeopleFields.map((field, index) => (
                            <div key={field.id} className="flex gap-3 items-start flex-col md:flex-row  border-b pb-2 md:border-none md:pb-0">
                                <div className="flex-1 space-y-2">
                                    <Input placeholder="Name" {...register(`keyPeople.${index}.name`)} />
                                    {errors.keyPeople?.[index]?.name && (
                                        <p className="text-sm text-red-500">
                                            {errors.keyPeople[index]?.name?.message}
                                        </p>
                                    )}
                                </div>
                                <div className="flex-1 space-y-2">
                                    <Input
                                        placeholder="Role (e.g., Founder, Director)"
                                        {...register(`keyPeople.${index}.role`)}
                                    />
                                    {errors.keyPeople?.[index]?.role && (
                                        <p className="text-sm text-red-500">
                                            {errors.keyPeople[index]?.role?.message}
                                        </p>
                                    )}
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removePerson(index)}
                                    className="text-muted-foreground hover:text-red-500 mt-0"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                        {keyPeopleFields.length === 0 && (
                            <p className="text-sm text-muted-foreground text-center py-4">
                                No key people added yet. Click "Add Person" to get started.
                            </p>
                        )}
                    </div>
                </section>

                <section className="space-y-4 border rounded-lg p-6 bg-card">
                    <div className="flex items-center justify-between">
                        <Label className="text-base font-semibold">Past Productions</Label>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                appendProduction({ name: "", images: [], imageUrls: [], videoUrl: "" })
                            }
                        >
                            <Plus className="w-4 h-4" />
                             <span className="hidden md:inline md:ml-2">Add Production</span>
                            
                        </Button>
                    </div>

                    <div className="space-y-6">
                        {productionFields.map((field, index) => {
                            const previews = productionImagePreviews[index] || [];
                            
                            return (
                                <div
                                    key={field.id}
                                    className="border rounded-lg p-4 bg-background space-y-4"
                                >
                                    <div className="flex gap-3 items-start">
                                        <div className="flex-1 space-y-2">
                                            <Input
                                                placeholder="Production name"
                                                {...register(`pastProductions.${index}.name`)}
                                            />
                                            {errors.pastProductions?.[index]?.name && (
                                                <p className="text-sm text-red-500">
                                                    {errors.pastProductions[index]?.name?.message}
                                                </p>
                                            )}
                                        </div>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeProduction(index)}
                                            className="text-muted-foreground hover:text-red-500"
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor={`videoUrl-${index}`} className="text-sm font-medium">
                                            Video URL (YouTube, Vimeo, etc.)
                                        </Label>
                                        <div className="relative">
                                            <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                id={`videoUrl-${index}`}
                                                placeholder="https://youtube.com/watch?v=..."
                                                className="pl-10"
                                                {...register(`pastProductions.${index}.videoUrl`)}
                                            />
                                        </div>
                                        {errors.pastProductions?.[index]?.videoUrl && (
                                            <p className="text-sm text-red-500">
                                                {errors.pastProductions[index]?.videoUrl?.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium">
                                            Production Images (Max 3)
                                        </Label>

                                        <div className="flex flex-wrap gap-3">
                                            {previews.map((preview, imgIndex) => (
                                                <div
                                                    key={imgIndex}
                                                    className="relative w-24 h-24 rounded-lg overflow-hidden border group"
                                                >
                                                    <img
                                                        src={preview.url}
                                                        alt={`Preview ${imgIndex + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index, imgIndex)}
                                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ))}

                                            {previews.length < 3 && (
                                                <label
                                                    htmlFor={`images-${index}`}
                                                    className="w-24 h-24 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-accent transition-colors"
                                                >
                                                    <Upload className="w-5 h-5 text-muted-foreground mb-1" />
                                                    <span className="text-xs text-muted-foreground">Upload</span>
                                                    <input
                                                        id={`images-${index}`}
                                                        type="file"
                                                        accept="image/*"
                                                        multiple
                                                        className="hidden"
                                                        onChange={(e) => handleImageUpload(index, e.target.files)}
                                                    />
                                                </label>
                                            )}
                                        </div>

                                        {errors.pastProductions?.[index]?.images && (
                                            <p className="text-sm text-red-500">
                                                {errors.pastProductions[index]?.images?.message}
                                            </p>
                                        )}

                                        <p className="text-xs text-muted-foreground">
                                            {previews.length}/3 images uploaded
                                        </p>
                                    </div>
                                </div>
                            );
                        })}

                        {productionFields.length === 0 && (
                            <p className="text-sm text-muted-foreground text-center py-4">
                                No productions added yet. Click "Add Production" to get started.
                            </p>
                        )}
                    </div>
                </section>
            </div>

            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving Profile...
                    </>
                ) : (
                    "Save Complete Profile"
                )}
            </Button>
        </form>
    );
}