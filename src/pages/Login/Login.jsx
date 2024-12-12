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
  setLoading,
} from "../../store/actions/login.action";
import { resetForm } from "../../store/actions/signUp.action";
import { useSpring, animated } from "@react-spring/web";

function Login() {
  const { email, password, error, isLoading } = useSelector(
    (state) => state.loginReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LoadingSpinner = useSpring({
    opacity: isLoading ? 1 : 0,
    visibility: isLoading ? "visible" : "hidden",
    config: { duration: 300 },
  });

  const handleLogin = async (e) => {
    dispatch(setLoading(true));
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
      const result = await dispatch(loginUser(email, password));
      if (result?.success) {
        localStorage.setItem("token", result.data.token);
        navigate("/dashboard");
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

  const handleReset = () => {
    dispatch(resetForm());
  };

  return (
    <>
      <animated.div
        style={LoadingSpinner}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
      </animated.div>
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
              <Link
                to="/signup"
                className="font-medium text-primary underline"
                onClick={handleReset}
              >
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
