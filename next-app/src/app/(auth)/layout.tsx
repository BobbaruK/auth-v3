import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PublicAuthLayout({ children }: Props) {
  return children;
}
