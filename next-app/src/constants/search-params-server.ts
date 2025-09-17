import { parseAsBoolean, parseAsString } from "nuqs/server";

export const serverSearchParams = () => ({
  twoFactor: parseAsString.withOptions({
    shallow: false,
  }),

  twoFactorFirstTime: parseAsBoolean.withDefault(false).withOptions({
    shallow: false,
  }),
});
