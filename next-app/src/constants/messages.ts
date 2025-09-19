const MESSAGES_FN = (resource?: string) => {
  return {
    ENTER_OTP: "Enter the OTP.",
    INVALID_FIELDS: "Some fields are invalid.",
    LOGIN_SUCCESS: "Login successful. Welcome back!",
    LOGOUT_SUCCESS: "You have successfully logged out.",
    PASSWORD_NEW:
      "Your password has been reset. Please log in with your new password.",
    PASSWORD_RESET:
      "Success! A confirmation email has been sent to reset your password.",
    PASSWORDS_NOT_MATCH: "Passwords do not match.",
    QR_SCAN: "Scan the QR code below and enter the OTP.",
    QR_VALIDATED: "QR code validated.",
    REGISTRATION_SUCCESS: "Registration complete. Please verify your email.",
    SOMETHING_WRONG: "Something went wrong. Please try again later.",
    TOKEN_INVALID: "The token is invalid.",
    TOKEN_MISSING: "Token is missing.",
  };
};

export const MESSAGES = MESSAGES_FN();
