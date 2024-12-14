import { actionTypes } from "../actionTypes";
import { setAllNotes } from "../../store/actions/home.action";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const setTitle = (title) => ({
  type: actionTypes.SET_TITLE,
  payload: title,
});

export const setContent = (content) => ({
  type: actionTypes.SET_CONTENT,
  payload: content,
});

export const setError = (error) => ({
  type: actionTypes.SET_ERROR,
  payload: error,
});

export const resetForm = () => ({
  type: actionTypes.RESET,
});

export const setIsLoading = (isLoading) => ({
  type: actionTypes.SET_IS_LOADING,
  payload: isLoading,
});

export const addNewNote =
  (title, content, token, onClose) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
      const response = await fetch(`${baseUrl}/api/v2/notes/add-note`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add note");
      }

      if (result.note) {
        dispatch(setAllNotes(token));
        onClose();
      }
    } catch (error) {
      dispatch(setError(error.message || "An unexpected error occurred"));
    } finally {
      dispatch(setIsLoading(false));
      dispatch(resetForm());
    }
  };

export const editNote =
  (noteId, title, content, token, onClose) => async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
      const response = await fetch(
        `${baseUrl}/api/v2/notes/edit-note/${noteId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, content }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update note");
      }

      if (result.note) {
        dispatch(setAllNotes(token));
        onClose();
      }
    } catch (error) {
      dispatch(setError(error.message || "An unexpected error occurred"));
    } finally {
      dispatch(setIsLoading(false));
      dispatch(resetForm());
    }
  };
