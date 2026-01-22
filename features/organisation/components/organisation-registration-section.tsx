"use client"
import React, { useCallback, useState } from 'react'
import EnhanceProfilePrompt from './EnhanceProfilePrompt';
import { OrganisationRegistrationForm } from './OrganisationRegistrationForm';
import { RegistrationFormData } from '../schema/registrationschema';
import { toast } from 'sonner';

function OrganisationRegistrationSection({ profileId }: { profileId: string }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFormSuccess, setIsFormSuccess] = useState(false);
    const [organisationName, setOrganisationName] = useState('');

    const handleFormSubmit = useCallback(async (data: RegistrationFormData) => {
        console.log("Form data:", data);
        try {
            setIsSubmitting(true);
            const response = await fetch("/api/organisations/registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...data,
                    profile_id: profileId
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Registration failed");
            }
            setIsFormSuccess(true)
            toast.success("Registration successful! Welcome aboard.");
        } catch (error: any) {
            console.error("Registration error:", error);
            toast.error(error.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    }, [profileId])

    if (isFormSuccess) {
        return (
            <EnhanceProfilePrompt organisationName={organisationName} />
        );
    }

    return (
        <div className="bg-card rounded-2xl border shadow-card p-6 sm:p-8 animate-fade-in">
            <OrganisationRegistrationForm
                handleFormSubmit={handleFormSubmit}
                isSubmitting={isSubmitting}
            />
        </div>
    )
}

export default OrganisationRegistrationSection