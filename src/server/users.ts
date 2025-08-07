"use server";

import { auth } from "@/lib/auth";

export const signInUser = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password
      },
      asResponse: true
    })
    return { success: true, message: "Login successful" };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "Login failed" };
  }
}

export const signUpUser = async (email: string, password: string, name: string) => {
  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name
      },
    })
    return { success: true, message: "Signup successful" };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "Signup failed" };
  }
}

export const sendPasswordResetOtp = async (email: string) => {
  try {
    await auth.api.sendVerificationOTP({
      body: {
        email,
        type: "forget-password",
      },
    });
  } catch (error) {
    // Log the error for debugging, but don't expose it to the client to prevent email enumeration.
    const e = error as Error;
    console.error("PASSWORD_RESET_OTP_ERROR", e);
  }
  // For security, always return a success-like message.
  return { success: true, message: "If an account with that email exists, a password reset code has been sent." };
}

export const resetUserPasswordWithOtp = async (email: string, otp: string, newPassword: string) => {
  try {
    await auth.api.resetPasswordEmailOTP({ body: { email, otp, password: newPassword } });
    return { success: true, message: "Password reset successfully." };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "Failed to reset password. The code may be invalid or expired." };
  }
}
