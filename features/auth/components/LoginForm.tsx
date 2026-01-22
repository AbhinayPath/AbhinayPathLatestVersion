"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Mail, Lock, AlertCircleIcon, OctagonAlert } from "lucide-react";
import { LoginFormValues, loginSchema } from "../schemas/login.schema";
import { Alert, AlertTitle } from "@/components/ui/alert";

type ProfileType = "artist" | "technician" | "organisation";

interface Profile {
    is_completed: boolean;
    type: ProfileType;
}


export function LoginForm() {
    const router = useRouter();
    const { refreshUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: LoginFormValues) => {
        setLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(values),
            });

            const result = await res.json();

            if (!res.ok) {
                if (res.status === 401) {
                    setError("password", {
                        type: "server",
                        message: "Invalid email or password",
                    });
                    return;
                } else {
                    setFormError(result?.message || "Unable to sign in. Please try again.");
                }
                throw new Error(result?.error || "Login failed");
            }

            await refreshUser();
            toast("Login successful");
            const redirectPath = getPostLoginRedirect(result.profile);
            router.replace(redirectPath);
        } catch (err) {
            toast("Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {formError && (
                <div
                    className="
                    flex items-start gap-3
                    rounded-xl border border-destructive/30
                    bg-destructive/10 dark:bg-destructive/15
                    px-4 py-3
                    animate-in fade-in slide-in-from-top-1
                "
                >
                    {/* Icon */}
                    <OctagonAlert className="mt-0.5 h-4 w-4 text-destructive shrink-0" />

                    {/* Text */}
                    <div className="space-y-0.5">
                        <p className="text-sm font-semibold text-destructive">
                            Submission failed
                        </p>
                        <p className="text-sm text-destructive/90 leading-relaxed">
                            {formError}
                        </p>
                    </div>
                </div>

            )}
            {/* Email */}
            <div className="space-y-1">
                <Label>Email</Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="email"
                        className="pl-10"
                        placeholder="you@example.com"
                        {...register("email")}
                        disabled={loading}
                    />
                </div>
                {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
            </div>

            {/* Password */}
            <div className="space-y-1">
                <Label>Password</Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                    <PasswordInput
                        className="pl-10"
                        placeholder="••••••••"
                        {...register("password")}
                        disabled={loading}
                    />
                </div>
                {errors.password && (
                    <p className="text-sm text-destructive">
                        {errors.password.message}
                    </p>
                )}
            </div>

            <div className="flex justify-end">
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                </Link>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                    </>
                ) : (
                    "Sign in"
                )}
            </Button>
        </form>
    );
}


function getPostLoginRedirect(profile: Profile): string {
    if (profile.is_completed) {
        return "/";
    }
    switch (profile.type) {
        case "organisation":
            return "/onboarding/organisation";

        case "artist":
            return "/talent-profile";

        case "technician":
            return "/technician-profile";

        default:
            return "/";
    }
}