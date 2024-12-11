import { actionTypes } from "../actionTypes";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const setName = (name) => ({
  type: actionTypes.SET_NAME,
  payload: name,
});

export const setEmail = (email) => ({
  type: actionTypes.SET_EMAIL,
  payload: email,
});

export const setPassword = (password) => ({
  type: actionTypes.SET_PASSWORD,
  payload: password,
});

export const resetForm = () => ({
  type: actionTypes.RESET,
});

export const setError = (error) => ({
  type: actionTypes.SET_ERROR,
  payload: error,
});

export const signUpUser = (name, email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/api/v2/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        dispatch(setError(errorData.message || "Sign-up failed"));
        return;
      }

      const data = await response.json();
      console.log("Sign-up successful:", data);
      dispatch(setError(null));
      return { success: true, data };
    } catch {
      dispatch(setError("Network error: Unable to sign up"));
    }
  };
};
