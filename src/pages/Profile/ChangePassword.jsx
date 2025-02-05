import { useNavigate } from "react-router-dom";
import Navbar from "../../component/Navbar";
import Password from "../../component/Input/Password";
import { validateEmail } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPassword,
  setEmail,
  setOTP,
  setNewPassword,
  setError,
  setLoading,
} from "../../store/actions/reset.action";
import { resetForm } from "../../store/actions/login.action";
import { useSpring, animated } from "@react-spring/web";
import Swal from "sweetalert2";

function ChangePassword() {
  const { email, otp, newPassword, error, isLoading } = useSelector(
    (state) => state.resetReducer
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

    if (!otp) {
      dispatch(setError("OTP tidak boleh kosong"));
      return;
    }

    if (!newPassword) {
      dispatch(setError("Password tidak boleh kosong"));
      return;
    }

    dispatch(setError(""));
    try {
      dispatch(setLoading(true));
      const result = await dispatch(resetPassword(email, otp, newPassword));
      if (result?.success) {
        handleReset();
        Swal.fire({
          title: "Reset Password!",
          text: "Password anda berhasil diubah!",
          timer: 3000,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/login");
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
            <h4 className="text-2xl mb-7 ">Ganti Password</h4>

            <input
              type="text"
              name="email"
              placeholder="Email"
              className="input-container"
              value={email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
            />

            <input
              type="text"
              placeholder="Kode OTP"
              className="input-container"
              value={otp}
              onChange={(e) => dispatch(setOTP(e.target.value))}
            />

            <Password
              value={newPassword}
              onChange={(e) => dispatch(setNewPassword(e.target.value))}
              placeholder={"Password Baru"}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              Ganti Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
