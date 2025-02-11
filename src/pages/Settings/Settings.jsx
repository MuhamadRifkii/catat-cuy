// Settings.jsx
import { useSpring, animated } from "@react-spring/web";
import Navbar from "../../component/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllNotes,
  setUserInfo,
  setToast,
} from "../../store/actions/home.action";
import Toast from "../../component/Toast";

export default function Settings() {
  const { isLoading, userInfo, toast } = useSelector(
    (state) => state.homeReducer
  );
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const LoadingSpinner = useSpring({
    opacity: isLoading ? 1 : 0,
    visibility: isLoading ? "visible" : "hidden",
    config: { duration: 300 },
  });

  const handleCloseToast = () =>
    dispatch(setToast({ isShown: false, message: "" }));

  // Initialize the theme state using a lazy initializer that reads from localStorage.
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      // Immediately update the <html> element based on the stored theme.
      if (storedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return storedTheme;
    } else {
      localStorage.setItem("theme", "light");
      return "light";
    }
  });

  // Update CSS custom properties whenever the theme changes.
  // useEffect(() => {
  //   const lightTheme = {
  //     "--bg-color": "#fdfeff",
  //     "--text-color": "#1f2937",
  //     "--accent-color": "#3b82f6",
  //     // Add more light theme variables if needed.
  //   };

  //   const darkTheme = {
  //     "--bg-color": "#1f2937",
  //     "--text-color": "#fdfeff",
  //     "--accent-color": "#2563eb",
  //     // Add more dark theme variables if needed.
  //   };

  //   const themeVars = theme === "dark" ? darkTheme : lightTheme;
  //   for (const key in themeVars) {
  //     document.documentElement.style.setProperty(key, themeVars[key]);
  //   }
  // }, [theme]);

  // Function to toggle the theme.
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    const loadUserAndNotes = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          await dispatch(setUserInfo(token, navigate));
          await dispatch(setAllNotes(token));
        } catch (error) {
          console.error("Error loading data:", error);
        }
      } else {
        navigate("/login");
      }
    };

    loadUserAndNotes();
  }, [dispatch, navigate]);

  return (
    <>
      <animated.div
        style={LoadingSpinner}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
      </animated.div>

      <Navbar token={token} userInfo={userInfo} />

      {/* Centered Theme Switcher */}
      <div className="fixed inset-0 flex items-center justify-center z-40">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded shadow hover:text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-300 dark:hover:text-gray-700 transition-colors"
        >
          {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        </button>
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
