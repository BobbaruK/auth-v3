import { Header } from "@/components/layout/header";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PublicLayout({ children }: Props) {
  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
      <Header />
      <main>{children}</main>
      <footer>
        <div className="container">Footer</div>
      </footer>
    </div>
  );
}
