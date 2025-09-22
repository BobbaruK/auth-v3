import { BIO, EMAIL, FIRSTNAME, LASTNAME, USERNAME } from "@/schemas/form";
import { z } from "zod";

export const PersonalSchema = z.object({
  firstName: FIRSTNAME,
  lastName: LASTNAME,
  userName: USERNAME,
  email: EMAIL,
  bio: BIO,
});
