"use client";

import { CustomAvatar } from "@/components/custom-avatar";
import { CustomButton } from "@/components/custom-button";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  userImage: string | null;
  isLoading: boolean;
}

const RemoveAvatar = ({ userImage, isLoading, ...restProps }: Props) => {
  return (
    <div className={cn("flex items-center gap-4", restProps.className)}>
      <CustomAvatar image={userImage} className="size-24" />
      <CustomButton
        buttonLabel="Remove"
        onClick={() => {}}
        disabled={isLoading}
      />
    </div>
  );
};

export default RemoveAvatar;
