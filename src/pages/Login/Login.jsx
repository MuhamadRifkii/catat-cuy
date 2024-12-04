import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../component/Navbar/Navbar";
import Password from "../../component/Input/Password";
import { validateEmail } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  setEmail,
  setError,
  setPassword,
} from "../../store/actions/login.action";

function Login() {
  const { email, password, error } = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      dispatch(setError("Masukkan alamat email yang valid"));
      return;
    }

    if (!password) {
      dispatch(setError("Password tidak boleh kosong"));
      return;
    }

    dispatch(setError(""));
    try {
      await dispatch(loginUser(name, email, password)); // Wait for sign-up to complete
      navigate("/dashboard"); // Navigate to the dashboard
    } catch (error) {
      console.error("Failed to sign up:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7 ">Masuk</h4>

            <input
              type="text"
              placeholder="Email"
              className="input-container"
              value={email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
            />

            <Password
              value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              Masuk
            </button>

            <p className="text-sm text-center mt-4">
              Belum punya akun?{" "}
              <Link to="/signup" className="font-medium text-primary underline">
                Buat akun
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
