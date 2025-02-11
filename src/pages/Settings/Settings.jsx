// Settings.jsx
import { useSpring, animated } from "@react-spring/web";
import Navbar from "../../component/Navbar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "../../store/actions/home.action";
import Toast from "../../component/Toast";

export default function Settings() {
  const { isLoading, userInfo, toast } = useSelector(
    (state) => state.homeReducer
  );
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const LoadingSpinner = useSpring({
    opacity: isLoading ? 1 : 0,
    visibility: isLoading ? "visible" : "hidden",
    config: { duration: 300 },
  });

  const handleCloseToast = () =>
    dispatch(setToast({ isShown: false, message: "" }));

  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
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
