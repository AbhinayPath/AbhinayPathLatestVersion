import { Sparkles, ArrowRight, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const EnhanceProfilePrompt = ({organisationName}: {organisationName: string}) => {
  const router =useRouter();
  const handleEnhance = () => {
    router.push("/organisations/profile/edit#enhanced-profile");
  };
  const handleSkip = () => {
    router.push("/organisations/view");
  };

  return (
    <div className="bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-lg animate-scale-in">
        {/* Success Card */}
        <div className="card-elevated p-8 text-center space-y-6">
          {/* Checkmark Animation */}
          <div className="relative mx-auto w-20 h-20">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
            <div className="relative w-full h-full bg-primary rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-primary-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <h1 className="heading-section text-2xl">Profile Created!</h1>
            <p className="text-muted-foreground">
              Your organisation profile for{" "}
              <span className="font-medium text-foreground">
                {organisationName || "your organisation"}
              </span>{" "}
              is now live.
            </p>
          </div>

          {/* Enhance Prompt */}
          <div className="bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/20 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-center gap-2 text-accent-foreground">
              <Sparkles className="w-5 h-5 text-gold" />
              <span className="font-medium">Enhance Your Profile</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Add more details to increase visibility and attract more opportunities on Abhinaypath.
            </p>
            <ul className="text-sm text-left space-y-2">
              <li className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-gold" />
                <span>Founded year & website</span>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-gold" />
                <span>Key team members</span>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-gold" />
                <span>Past productions & gallery</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-2">
            <Button
              onClick={handleEnhance}
              className="w-full h-12 text-base font-medium rounded-xl group"
            >
              <Sparkles className="mr-2 w-5 h-5" />
              Enhance Profile Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              variant="ghost"
              onClick={handleSkip}
              className="w-full h-12 text-muted-foreground hover:text-foreground"
            >
              <Clock className="mr-2 w-4 h-4" />
              I'll do this later
            </Button>
          </div>
        </div>

        {/* Quick Link */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          You can always update your profile from the{" "}
          <button
            className="text-primary hover:underline"
          >
            profile settings
          </button>
        </p>
      </div>
    </div>
  );
};

export default EnhanceProfilePrompt;
