import { actionTypes } from "../actionTypes";
import { setAllNotes, setToast } from "./home.action";
import { setLoading } from "./login.action";

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
        onClose();
        await dispatch(setAllNotes(token));
        dispatch(
          setToast({
            isShown: true,
            message: "Catatan Berhasil Ditambahkan!",
            type: "success",
          })
        );
        dispatch(resetForm());
      }
    } catch (error) {
      dispatch(setError(error.message || "An unexpected error occurred"));
      dispatch(
        setToast({
          isShown: true,
          message: error.message || "An error occurred.",
          type: "error",
        })
      );
    } finally {
      dispatch(setIsLoading(false));
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
        onClose();
        await dispatch(setAllNotes(token));
        dispatch(
          setToast({
            isShown: true,
            message: "Catatan Berhasil Diperbarui!",
            type: "success",
          })
        );
        dispatch(resetForm());
      }
    } catch (error) {
      dispatch(setError(error.message || "An unexpected error occurred"));
      dispatch(
        setToast({
          isShown: true,
          message: error.message || "An error occurred.",
          type: "error",
        })
      );
    } finally {
      dispatch(setIsLoading(false));
    }
  };

export const deleteNote = (noteId, token) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(`${baseUrl}/api/v2/notes/delete/${noteId}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete note");
      }

      if (!result.error) {
        await dispatch(setAllNotes(token));
        dispatch(
          setToast({
            isShown: true,
            message: "Catatan Berhasil Dihapus!",
            type: "delete",
          })
        );
      }
    } catch (error) {
      dispatch(
        setToast({
          isShown: true,
          message: error.message || "An error occurred.",
          type: "error",
        })
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const pinNote = (noteId, isPinned, token) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(
        `${baseUrl}/api/v2/notes/pin-note/${noteId}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ isPinned: !isPinned }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to pin note");
      }

      if (!result.error) {
        await dispatch(setAllNotes(token));
        dispatch(
          setToast({
            isShown: true,
            message: `Note ${!isPinned ? "Pinned" : "Unpinned"} Successfully!`,
          })
        );
      }
    } catch (error) {
      dispatch(
        setToast({
          isShown: true,
          message: error.message || "An error occurred.",
          type: "error",
        })
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
};
