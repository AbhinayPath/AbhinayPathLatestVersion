"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  registerSchema,
  RegisterFormValues,
} from "../schemas/register.schema";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      profileType: undefined,
    },
  });

  // 🔹 SUBMIT HANDLER
  const onSubmit = async (values: RegisterFormValues) => {
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          profileType: values.profileType,
        }),
      });

      const result = await response.json();
      console.log(response)
      if (response.status === 409) {
        setError("email", {
          type: "server",
          message: result?.message || "Email already registered",
        });
        return;
      }

      if (!response.ok) {
        toast.error("Registration failed");
        return;
      }

      toast.success("Your account is created. Please check your email to verify before logging in.");

      reset();
      onClose();
      router.push("/login");
    } catch (error) {
      toast.error("Unable to register. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Create account</DialogTitle>
          <DialogDescription>
            Register with email and choose your profile type
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" {...register("email")} placeholder="Enter your email" />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
                className="pr-10"
              />

              {/* Toggle Button */}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>


          {/* Profile Type */}
          <div className="space-y-2">
            <Label>Profession</Label>
            <Select
              onValueChange={(value) =>
                setValue("profileType", value as RegisterFormValues["profileType"])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Profession" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="artist">Artist</SelectItem>
                <SelectItem value="technician">Technician</SelectItem>
                <SelectItem value="organisation">Organisation</SelectItem>
              </SelectContent>
            </Select>
            {errors.profileType && (
              <p className="text-sm text-red-500">
                {errors.profileType.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating account..." : "Register"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
