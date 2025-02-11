/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserInfo,
  setToast,
  updateUserInfo,
} from "../../store/actions/home.action";
import { IoArrowBack } from "react-icons/io5";
import Navbar from "../../component/Navbar";
import Toast from "../../component/Toast";
import { getInitials, validateEmail } from "../../utils/helper";
import {
  requestResetPassword,
  setError,
  setLoading,
  setEmail,
} from "../../store/actions/reset.action";

export default function Profile() {
  const { isLoading, userInfo, toast } = useSelector(
    (state) => state.homeReducer
  );
  const { email } = useSelector((state) => state.resetReducer);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name || "",
        email: userInfo.email || "",
      });
    }
  }, [userInfo]);

  const LoadingSpinner = useSpring({
    opacity: isLoading ? 1 : 0,
    visibility: isLoading ? "visible" : "hidden",
    config: { duration: 300 },
  });

  const handleCloseToast = () =>
    dispatch(setToast({ isShown: false, message: "" }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUserInfo(token, formData, navigate));
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  const handleRequest = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      dispatch(setError("Masukkan alamat email yang valid"));
      return;
    }

    dispatch(setError(""));

    try {
      dispatch(setLoading(true));
      const result = await dispatch(requestResetPassword(email));

      if (result?.success) {
        dispatch(
          setError(
            "OTP Ganti Password Berhasil Dikirimkan. Mohon periksa Email anda"
          )
        );
        navigate("/ganti-password");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        dispatch(setError(error.response.data.message));
      } else {
        dispatch(setError("Unknown Error"));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    const loadUserInfo = async () => {
      if (token) {
        try {
          await dispatch(setUserInfo(token, navigate));
        } catch (error) {
          console.error("Error loading data:", error);
        }
      } else {
        navigate("/login");
      }
    };
    loadUserInfo();
  }, [dispatch, navigate]);

  useEffect(() => {
    if (userInfo?.email) {
      dispatch(setEmail(userInfo.email));
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <animated.div
        style={LoadingSpinner}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-white" />
      </animated.div>

      <Navbar token={token} userInfo={userInfo} />

      <div className="mx-auto mt-4 px-4">
        <div
          className="inline-flex items-center gap-2 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <IoArrowBack className="text-2xl" style={{ color: "var(--main)" }} />
          <h2
            className="text-xl font-semibold"
            style={{ color: "var(--main)" }}
          >
            Profil
          </h2>
        </div>

        {userInfo && (
          <>
            <div className="w-24 h-24 md:w-32 md:h-32 mx-auto flex items-center justify-center my-4 rounded-full text-slate-950 font-medium bg-slate-100 text-2xl md:text-3xl">
              {getInitials(userInfo?.name)}
            </div>
            {!editMode && (
              <p className="text-2xl mb-14 flex items-center justify-center">
                {userInfo.name}
              </p>
            )}
          </>
        )}

        <form onSubmit={handleSubmit}>
          {editMode && (
            <div className="mb-6">
              <label
                className="block text-sm font-medium"
                style={{ color: "var(--main)" }}
              >
                Nama
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                readOnly={!editMode}
                className={`w-full px-4 py-2.5 rounded-md ${
                  !editMode
                    ? "border border-white dark:border-gray-800 bg-white dark:bg-gray-800 cursor-not-allowed"
                    : "border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700"
                }`}
              />
            </div>
          )}
          <div className="mb-6">
            <label
              className="block text-sm font-medium"
              style={{ color: "var(--main)" }}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              readOnly={!editMode}
              className={`w-full px-4 py-2.5 border rounded-md ${
                !editMode
                  ? "border border-white dark:border-gray-800 bg-white dark:bg-gray-800 cursor-not-allowed"
                  : "border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700"
              }`}
            />
          </div>
          <div className="flex justify-between items-center">
            <label
              className="block text-sm font-medium"
              style={{ color: "var(--main)" }}
            >
              Password
            </label>
            {editMode && (
              <button
                type="button"
                onClick={handleRequest}
                className="text-red-500 text-sm font-medium"
              >
                Ganti Password
              </button>
            )}
          </div>
          <input
            type="password"
            value="***********"
            readOnly
            className="w-full px-4 py-2.5 mb-6 border border-white dark:border-gray-800 rounded-md bg-white dark:bg-gray-800 cursor-not-allowed"
          />

          {editMode && (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-md font-medium hover:bg-gray-200"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-primary text-white rounded-md font-medium hover:bg-blue-600"
              >
                Simpan Perubahan
              </button>
            </div>
          )}
        </form>

        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="w-full py-3 bg-primary text-white rounded-md font-medium hover:bg-blue-600"
          >
            Edit Profil
          </button>
        )}
      </div>

      {toast.isShown && (
        <Toast
          isShown={toast.isShown}
          message={toast.message}
          type={toast.type}
          onClose={handleCloseToast}
        />
      )}
    </>
  );
}
