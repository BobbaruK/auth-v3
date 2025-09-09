import React from "react";
import { Navbar } from "@/components/navbar";

export const Header = () => {
  return (
    <header>
      <div className="container flex items-center justify-start py-4">
        <Navbar />
      </div>
    </header>
  );
};
