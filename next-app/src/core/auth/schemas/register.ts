import {
  MAX_PASSWORD,
  MAX_USERNAME,
  MIN_PASSWORD,
  MIN_USERNAME,
} from "@/constants/misc";
import { passwordRefine } from "@/core/auth/utils/password-refine";
import { z } from "zod";

export const RegisterSchema = z.object({
  firstName: z
    .string()
    .min(MIN_USERNAME, {
      message: `First Name must be ${MIN_USERNAME} or more characters long`,
    })
    .max(MAX_USERNAME, {
      message: `First Name must be ${MAX_USERNAME} or fewer characters long`,
    }),
  lastName: z
    .string()
    .min(MIN_USERNAME, {
      message: `First Name must be ${MIN_USERNAME} or more characters long`,
    })
    .max(MAX_USERNAME, {
      message: `First Name must be ${MAX_USERNAME} or fewer characters long`,
    }),
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(MIN_PASSWORD, {
      message: `Password must be ${MIN_PASSWORD} or more characters long`,
    })
    .max(MAX_PASSWORD, {
      message: `Password must be ${MAX_PASSWORD} or fewer characters long`,
    })
    .superRefine((password, ctx) => passwordRefine(password, ctx)),
});
