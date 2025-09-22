import { MIN_BIO, MAX_BIO } from "@/constants/misc";
import z from "zod";

export const BIO = z
  .string()
  .min(MIN_BIO, {
    message: `Bio must be at least ${MIN_BIO} characters.`,
  })
  .max(MAX_BIO, {
    message: `Bio must not be longer than ${MAX_BIO} characters.`,
  })
  .optional();
