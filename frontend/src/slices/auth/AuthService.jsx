import {
  signUp,
  login,
  verifyEmail,
  resendOtp,
  forgotPassword,
  verifyForgotOtp,
  resetPassword,
  logout,
} from "../../api/authApi/AuthApiUrl";
import { ApiRequestHandler } from "../../hooks/UseApiRequestHandler";

export const authService = {
  signup: (data) => ApiRequestHandler("post", signUp, data),
  login: (data) => ApiRequestHandler("post", login, data),
  verifyEmail: (data) => ApiRequestHandler("post", verifyEmail, data),
  resendOtp: (data) => ApiRequestHandler("post", resendOtp, data),
  forgotPassword: (data) => ApiRequestHandler("post", forgotPassword, data),
  verifyForgotOtp: (data) => ApiRequestHandler("post", verifyForgotOtp, data),
  resetPassword: (data) => ApiRequestHandler("post", resetPassword, data),
  logout: () => ApiRequestHandler("get", logout),
};
