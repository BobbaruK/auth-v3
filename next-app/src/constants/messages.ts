const MESSAGES_FN = () => {
  return {
    BACKUPCODE_SUCCESS: "Your backup code has been successfully verified.",
    EMAIL_CHANGED: "Your email address has been updated. Please verify it.",
    EMAIL_OLD_NOT_MATCH:
      "The email provided does not match your current email address.",
    ENTER_OTP: "Please enter the one-time password (OTP).",
    INVALID_FIELDS: "Some fields are invalid. Please review and try again.",
    LOGIN_SUCCESS: "Login successful. Welcome back!",
    LOGOUT_SUCCESS: "You have successfully logged out.",
    PASSWORD_NEW:
      "Your password has been reset. Please log in with your new password.",
    PASSWORD_RESET:
      "Success! A password reset confirmation email has been sent.",
    PASSWORD_SET:
      "Your password has been set successfully. You can now log in.",
    PASSWORDS_NOT_MATCH: "Passwords do not match. Please try again.",
    PROFILE_UPDATED: "Your profile has been successfully updated.",
    QR_SCAN: "Scan the QR code below and enter the OTP to continue.",
    QR_VALIDATED: "QR code successfully verified.",
    REGISTRATION_SUCCESS:
      "Registration complete. Please verify your email address.",
    SESSION_EXPIRED: "Your session has expired. Please log in again.",
    SESSION_REVOKED_ALL: "All sessions have been successfully revoked.",
    SESSION_REVOKED_OTHERS:
      "All other sessions have been successfully revoked.",
    SESSION_REVOKED: "Your session has been revoked.",
    SOMETHING_WRONG: "Something went wrong. Please try again later.",
    TOKEN_INVALID: "The provided token is invalid.",
    TOKEN_MISSING: "No token was provided.",
    TWO_FACTOR_DISABLED:
      "Two-factor authentication has been successfully disabled.",
    USER_ADMIN_BAN: "You have successfully banned this user:",
    USER_ADMIN_OWNER: "You cannot ban a user with the role of OWNER.",
    USER_ADMIN_UNBAN: "You have successfully unbanned this user:",
    USER_NOT_EXIST: "This user does not exist.",
    USERNAME_NOT_AVAILABLE: "This username is not available.",
  };
};

export const MESSAGES = MESSAGES_FN();
