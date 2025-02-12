import Navbar from "../../component/Navbar";
import Password from "../../component/Input/Password";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import {
  resetForm,
  setEmail,
  setError,
  setName,
  setPassword,
  signUpUser,
  setLoading,
} from "../../store/actions/signUp.action";
import { useSpring, animated } from "@react-spring/web";
import Swal from "sweetalert2";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { googleLogin } from "../../store/actions/login.action";

export default function SignUp() {
  const { name, email, password, error, isLoading } = useSelector(
    (state) => state.signUpReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LoadingSpinner = useSpring({
    opacity: isLoading ? 1 : 0,
    visibility: isLoading ? "visible" : "hidden",
    config: { duration: 300 },
  });

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      dispatch(setError("Nama tidak boleh kosong"));
      return;
    }

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
      const result = await dispatch(signUpUser(name, email, password));
      if (result?.success) {
        localStorage.setItem("token", result.data.token);
        Swal.fire({
          title: "Registrasi Berhasi!",
          text: "Akun ada Berhasil dibuat!. Anda akan diarahkan kehalaman dashboard.",
          color: "var(--main)",
          background: "var(--bg-color)",
          timer: 2000,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/dashboard");
        });
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
        <div
          className="w-96 shadow-2xl rounded px-7 py-8"
          style={{ backgroundColor: "var(--bg-color)" }}
        >
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7" style={{ color: "var(--main)" }}>
              Buat Akun
            </h4>

            <input
              type="text"
              name="nama"
              placeholder="Nama"
              className="input-container"
              value={name}
              style={{ color: "var(--main)" }}
              onChange={(e) => dispatch(setName(e.target.value))}
            />

            <input
              type="text"
              name="email"
              placeholder="Email"
              className="input-container"
              value={email}
              style={{ color: "var(--main)" }}
              onChange={(e) => dispatch(setEmail(e.target.value))}
            />

            <Password
              value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              Daftar
            </button>

            <p
              className="text-sm text-center mt-4"
              style={{ color: "var(--gray)" }}
            >
              Sudah punya akun?{" "}
              <Link
                to="/login"
                className="font-medium text-primary underline"
                onClick={handleReset}
              >
                Masuk akun
              </Link>
            </p>
          </form>

          <div className="flex items-center w-full my-4">
            <div className="border-t border-gray-300 flex-grow"></div>
            <span className="mx-4" style={{ color: "var(--gray)" }}>
              ATAU
            </span>
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
                className="btn-primary flex items-center justify-center gap-2 py-2.5 bg-[var(--button)] text-[var(--main)] font-helvetica text-[14px] border border-black hover:bg-[var(--main)] hover:text-[var(--button)] transition-colors"
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
