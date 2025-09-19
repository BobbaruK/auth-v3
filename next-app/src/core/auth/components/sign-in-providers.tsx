"use client";

import { CustomButton } from "@/components/custom-button";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import { FaGithub } from "react-icons/fa";
import { GrGoogle } from "react-icons/gr";

const SignInProviders = () => {
  const handleGithubClick = async () => {
    await signIn.social({
      provider: "github",
    });
  };

  const handleGoogleClick = async () => {
    await signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-center flex-wrap">
        <CustomButton
          buttonLabel={`Login with GitHub`}
          variant="outline"
          icon={FaGithub}
          iconPlacement="left"
          className="grow"
          onClick={handleGithubClick}
          skeletonClassName="grow"
        />

        <CustomButton
          buttonLabel={`Login with Google`}
          variant="outline"
          icon={GrGoogle}
          iconPlacement="left"
          className="grow"
          onClick={handleGoogleClick}
          skeletonClassName="grow"
        />
      </div>
    </div>
  );
};

export default SignInProviders;
