import { ButtonEffects } from "@/types/button";

/**
 * Minimum characters in a password
 * @type {number}
 */
export const MIN_PASSWORD = 6;

/**
 * Maximum characters in a password
 * @type {number}
 */
export const MAX_PASSWORD = 30;

/**
 * Minumum characters in a username
 * @type {number}
 */
export const MIN_USERNAME = 2;

/**
 * Maximum characters in a username
 * @type {number}
 */
export const MAX_USERNAME = 50;

/**
 * Session expiration time (seconds)
 * @type {number}
 */
export const SESSION_EXPIRES = 60 * 60 * 24 * 30;

/**
 * Valid email domains
 * @type {array}
 */
export const VALID_DOMAINS = ["gmail.com", "yahoo.com", "outlook.com"];

/**
 * Default Button Effect
 * @type {string}
 */
export const BUTTON_EFFECT: ButtonEffects = "gooeyLeft";
