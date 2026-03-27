import React, { useCallback, useState, useEffect } from 'react'
import EnhanceProfilePrompt from './EnhanceProfilePrompt';
import { MergedOrganisationForm, MergedOrganisationFormData } from './MergedOrganisationForm';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

function OrganisationRegistrationSection({ profileId }: { profileId: string }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFormSuccess, setIsFormSuccess] = useState(false);
    const [profileData, setProfileData] = useState<any>(null);
    const [organisationName, setOrganisationName] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const fetchExistingProfile = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await fetch("/api/organisations/me");
            if (res.ok) {
                const data = await res.json();
                if (data.organisation) {
                    setProfileData(data.organisation);
                    setOrganisationName(data.organisation.organisation_name || '');
                }
            }
        } catch (error) {
            console.error("Failed to fetch profile", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchExistingProfile();
    }, [fetchExistingProfile]);

    const handleFormSubmit = useCallback(async (data: MergedOrganisationFormData) => {
        console.log("Form data:", data);
        try {
            setIsSubmitting(true);
            const formData = new FormData();
            const { pastProductions, imagesToDelete, keyPeople, ...restData } = data;
            
            formData.append("data", JSON.stringify({
                ...restData,
                keyPeople: keyPeople || []
            }));
            
            if (imagesToDelete && imagesToDelete.length > 0) {
                formData.append("imagesToDelete", JSON.stringify(imagesToDelete));
            }

            const productionsMetadata: any[] = []
            if (pastProductions && pastProductions.length > 0) {
                pastProductions.forEach((prod: any, idx: number) => {
                    productionsMetadata.push({
                        name: prod.name,
                        videoUrl: prod.videoUrl || "",
                        existingImageUrls: prod.imageUrls || [],
                        newImagesCount: prod.images?.length || 0,
                    })
                    if (prod.images?.length > 0) {
                        prod.images.forEach((file: File) => {
                            formData.append(`production_${idx}_images`, file, file.name)
                        })
                    }
                })
            }
            formData.append("productions", JSON.stringify(productionsMetadata))

            const response = await fetch("/api/organisations/me", {
                method: "PUT",
                body: formData,
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.error || "Update failed");
            }
            
            setOrganisationName(data.organisation_name);
            setIsFormSuccess(true)
            toast.success("Profile saved successfully!");
        } catch (error: any) {
            console.error("Submission error:", error);
            toast.error(error.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    }, [])

    const transformProfileData = (org: any) => {
        if (!org) return null
        return {
            organisation_name: org.organisation_name || '',
            organisation_types: org.organisation_types || [],
            city: org.city || '',
            state: org.state || '',
            country: org.country || '',
            primary_languages: org.primary_languages || [],
            core_work: org.core_work || [],
            contact_email: org.contact_email || '',
            instagram: org.instagram || '',
            short_description: org.short_description || '',
            founded_year: org.founded_year || '',
            website: org.website || '',
            youtube: org.youtube || '',
            keyPeople: (org.organisation_key_people || []).map((p: any) => ({ name: p.name, role: p.role })),
            pastProductions: (org.organisation_past_productions || []).map((prod: any) => ({
                name: prod.name,
                videoUrl: prod.video_url,
                imageUrls: prod.image_urls,
                images: []
            })),
            imagesToDelete: []
        }
    }

    if (isFormSuccess) {
        return (
            <EnhanceProfilePrompt organisationName={organisationName} />
        );
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="bg-card rounded-2xl border shadow-card p-6 sm:p-8 animate-fade-in">
            <MergedOrganisationForm
                handleFormSubmit={handleFormSubmit}
                isSubmitting={isSubmitting}
                initialData={transformProfileData(profileData) as any}
                profileId={profileId}
            />
        </div>
    )
}

export default OrganisationRegistrationSection