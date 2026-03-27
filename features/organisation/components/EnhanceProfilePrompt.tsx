

const EnhanceProfilePrompt = ({ organisationName }: { organisationName: string }) => {

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


          {/* Actions */}

        </div>

        {/* Quick Link */}

      </div>
    </div>
  );
};

export default EnhanceProfilePrompt;
