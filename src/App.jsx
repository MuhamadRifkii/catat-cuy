import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Reset from "./pages/Reset/Reset";
import RequestReset from "./pages/Reset/RequestReset";
import Saran from "./pages/Saran/Saran";

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
      <Route path="/saran" exact element={<Saran />} />
    </Routes>
  </Router>
);

export default function App() {
  return <div>{routes}</div>;
}
