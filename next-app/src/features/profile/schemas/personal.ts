import { MAX_BIO, MAX_USERNAME, MIN_BIO, MIN_USERNAME } from "@/constants/misc";
import { USERNAME_SCHEMA } from "@/schemas/username";
import { z } from "zod";

export const PersonalSchema = z.object({
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
      message: `Last Name must be ${MIN_USERNAME} or more characters long`,
    })
    .max(MAX_USERNAME, {
      message: `Last Name must be ${MAX_USERNAME} or fewer characters long`,
    }),
  userName: USERNAME_SCHEMA,
  email: z.email({ message: "Invalid email address" }),
  bio: z
    .string()
    .min(MIN_BIO, {
      message: `Bio must be at least ${MIN_BIO} characters.`,
    })
    .max(MAX_BIO, {
      message: `Bio must not be longer than ${MAX_BIO} characters.`,
    })
    .optional(),
});
