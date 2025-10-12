import { ButtonEffects } from "@/types/button";

export const MIN_PASSWORD = 6;
export const MAX_PASSWORD = 30;
export const MIN_USERNAME = 2;
export const MAX_USERNAME = 50;
export const MIN_BIO = 2;
export const MAX_BIO = 260;
export const VALID_DOMAINS = ["gmail.com", "yahoo.com", "outlook.com"];
export const BUTTON_EFFECT: ButtonEffects = "gooeyLeft";

export const SESSION_EXPIRES = 60 * 60 * 24 * 30; // 30 days
export const SESSION_FRESH_AGE = 60 * 60 * 12; // 12 hours
export const VERIFICATION_MAIL_EXPIRES = 60 * 60; // 1 hour
export const RESET_PASSWORD_TOKEN_EXPIRES = 60 * 60; // 1 hour
export const DELETE_ACCOUNT_TOKEN_EXPIRES = 60 * 60; // 1 hour
