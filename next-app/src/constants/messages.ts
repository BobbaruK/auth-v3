const MESSAGES_FN = () => {
  return {
    BACKUPCODE_SUCCESS: "Your backup code has been successfully validated.",
    EMAIL_CHANGED: "Your email has been changed. Please verify it.",
    EMAIL_OLD_NOT_MATCH: "Email does not match with your actual email",
    ENTER_OTP: "Please enter the OTP.",
    INVALID_FIELDS: "Some fields are invalid. Check and try again.",
    LOGIN_SUCCESS: "Login successful. Welcome back!",
    LOGOUT_SUCCESS: "You have successfully logged out.",
    PASSWORD_NEW:
      "Your password has been reset. Please log in with your new password.",
    PASSWORD_RESET:
      "Success! A confirmation email has been sent to reset your password.",
    PASSWORD_SET:
      "Your password has been set. You can now log in with your credentials.",
    PASSWORDS_NOT_MATCH: "Passwords do not match.",
    PROFILE_UPDATED: "Your profile has been updated.",
    QR_SCAN: "Scan the QR code below and enter the OTP.",
    QR_VALIDATED: "QR code successfully validated.",
    REGISTRATION_SUCCESS: "Registration complete. Please verify your email.",
    SESSION_EXPIRED: "Your session has expired. Please log in again.",
    SOMETHING_WRONG: "Something went wrong. Please try again later.",
    TOKEN_INVALID: "The token provided is invalid.",
    TOKEN_MISSING: "No token provided.",
    TWO_FACTOR_DISABLED:
      "Two-factor authentication has been successfully disabled.",
    USER_NOT_EXIST: "This user does not exist.",
    USERNAME_NOT_AVAILABLE: "This username is not available.",
  };
};

export const MESSAGES = MESSAGES_FN();
