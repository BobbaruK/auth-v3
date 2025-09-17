import { parseAsBoolean, parseAsString } from "nuqs";
import { TransitionStartFunction } from "react";

export const clientSearchParams = (
  startTransition: TransitionStartFunction
) => ({
  twoFactor: parseAsString.withOptions({
    shallow: false,
    startTransition,
  }),

  twoFactorFirstTime: parseAsBoolean.withDefault(false).withOptions({
    shallow: false,
    startTransition,
  }),
});
