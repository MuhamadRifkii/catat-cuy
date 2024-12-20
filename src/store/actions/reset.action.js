import { actionTypes } from "../actionTypes";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const setEmail = (email) => ({
  type: actionTypes.SET_EMAIL,
  payload: email,
});

export const setOTP = (otp) => ({
  type: actionTypes.SET_OTP,
  payload: otp,
});

export const setNewPassword = (newPassword) => ({
  type: actionTypes.SET_NEW_PASSWORD,
  payload: newPassword,
});

export const resetForm = () => ({
  type: actionTypes.RESET,
});

export const setError = (error) => ({
  type: actionTypes.SET_ERROR,
  payload: error,
});

export const setLoading = (isLoading) => ({
  type: actionTypes.SET_LOADING,
  payload: isLoading,
});

export const requestResetPassword = (email) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${baseUrl}/api/v2/auth/request-password-reset`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        dispatch(setError(errorData.message || "Request gagal"));
        return;
      }

      const data = await response.json();
      dispatch(setError(null));
      return { success: true, data };
    } catch {
      dispatch(setError("Network error: Unable to login"));
    }
  };
};

export const resetPassword = (email, otp, newPassword) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/api/v2/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        dispatch(setError(errorData.message || "Login failed"));
        return;
      }

      const data = await response.json();
      dispatch(setError(null));
      return { success: true, data };
    } catch {
      dispatch(setError("Network error: Unable to login"));
    }
  };
};
