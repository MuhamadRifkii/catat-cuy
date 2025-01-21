import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../component/Navbar";
import Password from "../../component/Input/Password";
import { validateEmail } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  setEmail,
  setError,
  setPassword,
  setLoading,
  googleLogin,
} from "../../store/actions/login.action";
import { resetForm } from "../../store/actions/signUp.action";
import { useSpring, animated } from "@react-spring/web";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

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
      dispatch(setLoading(true));
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

  const handleGoogleLogin = async (response) => {
    try {
      dispatch(setLoading(true));
      const result = await dispatch(googleLogin(response));

      if (result?.success) {
        localStorage.setItem("token", result.data.token);
        navigate("/dashboard");
      }
    } catch {
      dispatch(setError("Google Login Failed"));
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

      <div className="flex items-center justify-center my-[10vh]">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Masuk</h4>

            <input
              type="text"
              name="email"
              placeholder="Email"
              className="input-container"
              value={email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
            />

            <Password
              value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
            />

            <p className="text-sm text-end mb-2">
              <Link
                to="/request-reset"
                className="font-medium text-primary underline"
                onClick={handleReset}
              >
                Lupa Password?
              </Link>
            </p>

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

          <div className="flex items-center w-full my-4">
            <div className="border-t border-gray-300 flex-grow"></div>
            <span className="mx-4 text-gray-500">ATAU</span>
            <div className="border-t border-gray-300 flex-grow"></div>
          </div>

          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <div className="w-full">
              <button
                type="button"
                onClick={() => {
                  const googleLoginButton =
                    document.querySelector('[role="button"]');
                  if (googleLoginButton) {
                    googleLoginButton.click();
                  }
                }}
                className="btn-primary flex items-center justify-center gap-2 py-2.5 bg-white text-black font-helvetica text-[14px] border border-black hover:bg-black hover:text-white transition-colors"
              >
                <FcGoogle
                  icon="flat-color-icons:google"
                  width="22"
                  height="22"
                />
                Masuk Dengan Google
              </button>
              <div className="hidden">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => {
                    dispatch(setError("Gagal Login dengan Google"));
                  }}
                  useOneTap
                />
              </div>
            </div>
          </GoogleOAuthProvider>
        </div>
      </div>
    </>
  );
}

export default Login;
