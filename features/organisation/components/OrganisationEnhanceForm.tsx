"use client"
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Calendar, Globe, Youtube, Users, Film, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OrganisationEnhancedProfileData, organisationEnhancedProfileSchema } from "../schema/organisationenhancedprofileschema";


const OrganisationEnhanceForm = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<OrganisationEnhancedProfileData>({
        resolver: zodResolver(organisationEnhancedProfileSchema),
        defaultValues: {
            founded_year: "",
            website: "",
            youtube: "",
            keyPeople: [],
            pastProductions: [],
        }
    });

    // Use react-hook-form's useFieldArray for array management
    const { fields: keyPeopleFields, append: appendPerson, remove: removePerson } = useFieldArray({
        control,
        name: "keyPeople",
    });

    const { fields: productionFields, append: appendProduction, remove: removeProduction } = useFieldArray({
        control,
        name: "pastProductions",
    });

    const onSubmit = async (data: OrganisationEnhancedProfileData) => {
        console.log("Complete form data with validation:", data);
        // All data including arrays are now properly validated and typed
    };

    return (
        <div className="space-y-8">
            {/* Basic Info */}
            <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                    <Label htmlFor="founded_year">Founded Year</Label>
                    <Input
                        id="founded_year"
                        placeholder="e.g., 2015"
                        {...register("founded_year")}
                    />
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
                    {errors.website && (
                        <p className="text-sm text-red-500">{errors.website.message}</p>
                    )}
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
                    {errors.youtube && (
                        <p className="text-sm text-red-500">{errors.youtube.message}</p>
                    )}
                </div>
            </div>

            {/* Key People */}
            <section className="space-y-4 border rounded-lg p-6 bg-card">
                <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">Key People</Label>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => appendPerson({ name: "", role: "" })}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Person
                    </Button>
                </div>

                <div className="space-y-3">
                    {keyPeopleFields.map((field, index) => (
                        <div key={field.id} className="flex gap-3 items-start">
                            <div className="flex-1 space-y-2">
                                <Input
                                    placeholder="Name"
                                    {...register(`keyPeople.${index}.name`)}
                                />
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

            {/* Past Productions */}
            <section className="space-y-4 border rounded-lg p-6 bg-card">
                <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">Past Productions</Label>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => appendProduction({ name: "" })}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Production
                    </Button>
                </div>

                <div className="space-y-3">
                    {productionFields.map((field, index) => (
                        <div key={field.id} className="flex gap-3 items-start">
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
                    ))}

                    {productionFields.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4">
                            No productions added yet. Click "Add Production" to get started.
                        </p>
                    )}
                </div>
            </section>

            {/* Submit */}
            <div className="flex justify-end gap-4 pt-4">
                <Button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    className="px-8"
                >
                    {isSubmitting ? (
                        <span className="animate-pulse">Saving...</span>
                    ) : (
                        <>
                            Save Enhanced Profile
                            <ArrowRight className="ml-2 w-5 h-4" />
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
};

export default OrganisationEnhanceForm;
