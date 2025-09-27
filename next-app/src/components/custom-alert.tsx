import {
  Alert,
  AlertDescription,
  AlertTitle,
  alertVariants,
} from "@/components/ui/alert";
import { VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import { FaTerminal } from "react-icons/fa6";

interface Props extends VariantProps<typeof alertVariants> {
  title: string;
  description?: string;
  icon?: ReactNode;
}

export const CustomAlert = ({
  description,
  title,
  icon,
  ...restProps
}: Props) => {
  return (
    <Alert variant={restProps.variant}>
      {icon || <FaTerminal />}
      <AlertTitle>{title}</AlertTitle>
      {description && (
        <AlertDescription className="text-foreground">
          {description}
        </AlertDescription>
      )}
    </Alert>
  );
};
