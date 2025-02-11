import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Reset from "./pages/Reset/Reset";
import RequestReset from "./pages/Reset/RequestReset";
import Saran from "./pages/Saran/Saran";
import Settings from "./pages/Settings/Settings";
import ChangePassword from "./pages/Profile/ChangePassword";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const routes = (
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          localStorage.getItem("token") ? (
            <Navigate to="/dashboard" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/login" exact element={<Login />} />
      <Route path="/signup" exact element={<SignUp />} />
      <Route path="/reset" exact element={<Reset />} />
      <Route path="/request-reset" exact element={<RequestReset />} />
      <Route path="/dashboard" exact element={<Home />} />
      <Route path="/profile" exact element={<Profile />} />
      <Route path="/saran" exact element={<Saran />} />
      <Route path="/pengaturan" exact element={<Settings />} />
      <Route path="/ganti-password" exact element={<ChangePassword />} />
    </Routes>
  </Router>
);

export default function App() {
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  return (
    <div>
      {routes}
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
