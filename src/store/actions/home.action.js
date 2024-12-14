import { actionTypes } from "../actionTypes";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const setLoading = (isLoading) => ({
  type: actionTypes.SET_LOADING,
  payload: isLoading,
});

export const setUserInfo = (token) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(`${baseUrl}/api/v2/auth/get-user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.clear();
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to get user info");
      }

      const data = await response.json();
      dispatch({
        type: actionTypes.SET_USER_INFO,
        payload: data.user,
      });
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const setAllNotes = (token) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(`${baseUrl}/api/v2/notes/get-all-notes`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get all notes");
      }

      const data = await response.json();
      dispatch({
        type: actionTypes.SET_ALL_NOTES,
        payload: data.notes,
      });
    } catch (error) {
      console.error("Error fetching notes:", error);
      if (error.response?.status === 401) {
        localStorage.clear();
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const setFilter = (filterValue) => ({
  type: actionTypes.SET_FILTER,
  payload: filterValue,
});

export const setOpenAddEditModal = (modalState) => {
  return {
    type: actionTypes.SET_OPEN_ADD_EDIT_MODAL,
    payload: modalState,
  };
};
