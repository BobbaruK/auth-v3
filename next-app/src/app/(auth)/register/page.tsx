import { RegisterForm } from "@/core/auth/components/register-form";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="container py-4 space-y-8">
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Register</h1>

        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
