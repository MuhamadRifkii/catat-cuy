import { actionTypes } from "../actionTypes";

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

export const setError = (error) => ({
  type: actionTypes.SET_ERROR,
  payload: error,
});

// export const signUpUser = (name, email, password) => {
//   return async (dispatch) => {
//     try {
//       const response = await fetch("/api/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         dispatch(setSignUpError(errorData.message || "Sign-up failed"));
//         return;
//       }

//       const data = await response.json();
//       console.log("Sign-up successful:", data);
//       dispatch(setSignUpError(null)); // Clear error on success
//     } catch (error) {
//       dispatch(setSignUpError("Network error: Unable to sign up"));
//     }
//   };
// };
