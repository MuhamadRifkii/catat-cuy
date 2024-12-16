import Navbar from "../../component/Navbar/Navbar";
import { validateEmail } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import {
  requestResetPassword,
  setEmail,
  setError,
  setLoading,
} from "../../store/actions/reset.action";
import { useSpring, animated } from "@react-spring/web";
import { useNavigate } from "react-router-dom";

function Reset() {
  const { email, error, isLoading } = useSelector(
    (state) => state.resetReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LoadingSpinner = useSpring({
    opacity: isLoading ? 1 : 0,
    visibility: isLoading ? "visible" : "hidden",
    config: { duration: 300 },
  });

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
            "OTP Reset Password Berhasil Dikirimkan. Mohon periksa Email anda"
          )
        );
        navigate("/reset");
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
          <form onSubmit={handleRequest}>
            <h4 className="text-2xl mb-7 ">Reset Password</h4>

            <input
              type="text"
              placeholder="Email"
              className="input-container"
              value={email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              Kirim Permintaan Reset
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Reset;
