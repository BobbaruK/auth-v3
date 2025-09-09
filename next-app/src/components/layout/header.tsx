"use client";

import React from "react";
import { Navbar } from "@/components/navbar";
import { SignOutButton } from "@/core/auth/components/sign-out-button";
import { useSession } from "@/lib/auth-client";

export const Header = () => {
  const { data: session } = useSession();
  return (
    <header>
      <div className="container flex items-center justify-start py-4">
        <Navbar />
        {session && <SignOutButton />}
      </div>
    </header>
  );
};
