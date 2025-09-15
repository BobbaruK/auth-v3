/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const AUTH_ROUTES = ["/login", "/register", "/reset", "/new-password"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const API_AUTH_PREFIX = "/api/auth";

/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const PUBLIC_ROUTES = ["/"];

/**
 * An array of routes that are forbidden to all users
 * regardless of their role or authenticated
 * @type {string[]}
 */
export const FORBIDDEN_ROUTES: string[] = [
  // "/"
];
