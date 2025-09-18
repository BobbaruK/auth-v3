import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PublicAuthLayout({ children }: Props) {
  return (
    <div className="flex items-center justify-center min-h-dvh">{children}</div>
  );
}
