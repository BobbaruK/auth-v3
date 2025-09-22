import { EMAIL, FIRSTNAME, LASTNAME, PASSWORD, USERNAME } from "@/schemas/form";
import { z } from "zod";

export const RegisterSchema = z.object({
  firstName: FIRSTNAME,
  lastName: LASTNAME,
  userName: USERNAME,
  email: EMAIL,
  password: PASSWORD,
});
