"use client";

import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { MergedOrganisationForm, MergedOrganisationFormData } from "@/features/organisation/components/MergedOrganisationForm";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OrganisationProfilePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [initialData, setInitialData] = useState<any>(null);
    const router = useRouter();
    
    useEffect(() => {
        const fetchOrganisation = async () => {
            try {
                const res = await fetch("/api/organisations/me", {
                    credentials: "include",
                });

                if (!res.ok) return;
                const data = await res.json();
                setInitialData(data);
                console.log("Loaded organisation data:", data);
            } catch (error) {
                console.error("Failed to load organisation data", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrganisation();
    }, []);

    // Main form submit handler
    const handleFormSubmit = useCallback(
        async (data: any) => {
            console.log("=== handleFormSubmit called ===");
            console.log("Form data:", data);

            try {
                setIsSubmitting(true);

                // Create FormData to send files
                const formData = new FormData();

                // Separate out special fields
                const { pastProductions, imagesToDelete, keyPeople, ...restData } = data;

                // Add basic data as JSON string
                formData.append("data", JSON.stringify({
                    ...restData,
                    keyPeople: keyPeople || []
                }));
                console.log("Basic data added to FormData");

                // Add images to delete
                if (imagesToDelete && imagesToDelete.length > 0) {
                    formData.append("imagesToDelete", JSON.stringify(imagesToDelete));
                    console.log("Images to delete:", imagesToDelete);
                }

                // Process productions and add files
                const productionsMetadata: any[] = [];

                if (pastProductions && pastProductions.length > 0) {
                    pastProductions.forEach((production: any, index: number) => {
                        console.log(`Processing production ${index}:`, production);

                        // Prepare metadata
                        const metadata = {
                            name: production.name,
                            videoUrl: production.videoUrl || "",
                            existingImageUrls: production.imageUrls || [],
                            newImagesCount: production.images?.length || 0,
                        };
                        productionsMetadata.push(metadata);

                        // Add new image files to FormData
                        if (production.images && production.images.length > 0) {
                            console.log(`Adding ${production.images.length} images for production ${index}`);
                            production.images.forEach((file: File) => {
                                console.log(`  - File: ${file.name}, Size: ${file.size}, Type: ${file.type}`);
                                formData.append(`production_${index}_images`, file, file.name);
                            });
                        }
                    });
                }

                formData.append("productions", JSON.stringify(productionsMetadata));
                console.log("Productions metadata:", productionsMetadata);

                // Log FormData contents
                console.log("=== FormData contents ===");
                for (const [key, value] of formData.entries()) {
                    if (value instanceof File) {
                        console.log(`${key}: File - ${value.name} (${value.size} bytes, ${value.type})`);
                    } else {
                        console.log(`${key}:`, value);
                    }
                }

                // Send to API
                console.log("Sending request to API...");
                const res = await fetch("/api/organisations/me", {
                    method: "PUT",
                    credentials: "include",
                    body: formData,
                });

                console.log("Response status:", res.status);

                if (!res.ok) {
                    const error = await res.json();
                    console.error("API error:", error);
                    throw new Error(error.details || error.message || "Failed to update profile");
                }

                const result = await res.json();
                console.log("API response:", result);

                toast.success("Profile saved successfully!");
                router.push("/organisations/view");
                // // Refresh data
                // console.log("Refreshing data...");
                // const refreshRes = await fetch("/api/organisations/me", {
                //     credentials: "include",
                // });

                // if (refreshRes.ok) {
                //     const refreshedData = await refreshRes.json();
                //     console.log("Refreshed data:", refreshedData);
                //     setInitialData(refreshedData.organisation);
                // }

            } catch (error: any) {
                console.error("=== Form submission error ===", error);
                toast.error(error.message || "Something went wrong");
            } finally {
                setIsSubmitting(false);
                console.log("=== handleFormSubmit completed ===");
            }
        },
        []
    );

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">
                        Loading organization data...
                    </p>
                </div>
            </div>
        )
    }

    if (!initialData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-muted-foreground">
                        No organization data found.
                    </p>
                </div>
            </div>
        )
    }
    const transformedData = transformApiDataToFormData(initialData);
    return (
        <div className="container mx-auto py-8">
            <MergedOrganisationForm
                handleFormSubmit={handleFormSubmit}
                isSubmitting={isSubmitting}
                initialData={transformedData}
                profileId={initialData?.profile_id}
            />
        </div>
    );
}

// Add this helper function where you're calling MergedOrganisationForm
function transformApiDataToFormData(apiData: any) {
    return {
        organisation_name: apiData.organisation.organisation_name || '',
        organisation_types: apiData.organisation.organisation_types || [],
        city: apiData.organisation.city || '',
        state: apiData.organisation.state || '',
        country: apiData.organisation.country || '',
        primary_languages: apiData.organisation.primary_languages || [],
        core_work: apiData.organisation.core_work || [],
        contact_email: apiData.organisation.contact_email || '',
        instagram: apiData.organisation.instagram || '',
        short_description: apiData.organisation.short_description || '',
        founded_year: apiData.organisation.founded_year || '',
        website: apiData.organisation.website || '',
        youtube: apiData.organisation.youtube || '',
        // Transform key people
        keyPeople: (apiData.organisation.organisation_key_people || []).map((person: any) => ({
            name: person.name,
            role: person.role
        })),
        // Transform past productions
        pastProductions: (apiData.organisation.organisation_past_productions || []).map((prod: any) => ({
            name: prod.name,
            videoUrl: prod.video_url || '',
            imageUrls: prod.image_urls || [],
            images: [] // New files will be added here
        })),
        imagesToDelete: [] // Track images to delete
    };
}

