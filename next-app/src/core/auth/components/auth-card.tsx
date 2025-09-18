import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ReactNode } from "react";
import { AuthFooter } from "./auth-footer";

interface Props {
  title: string;
  description: string;
  children: ReactNode;
}

export const AuthCard = ({ title, description, children }: Props) => {
  return (
    <div className="max-w-96 mx-auto flex flex-col gap-6 items-center">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="text-balance">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">{children}</CardContent>
      </Card>

      <AuthFooter />
    </div>
  );
};
