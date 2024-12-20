import { actionTypes } from "../actionTypes";

const baseUrl = import.meta.env.VITE_BASE_URL;

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

export const setLoading = (isLoading) => ({
  type: actionTypes.SET_LOADING,
  payload: isLoading,
});

export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl}/api/v2/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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

export const googleLogin = (response) => {
  return async (dispatch) => {
    try {
      const result = await fetch(`${baseUrl}/api/v2/auth/oauth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: response.credential }),
      });

      const data = await result.json();
      if (data.error) {
        dispatch(setError(data.message || "Unknown Error"));
      } else {
        return { success: true, data };
      }
    } catch {
      dispatch(setError("Terjadi kesalahan saat login dengan Google"));
    } finally {
      dispatch(setLoading(false));
    }
  };
};
