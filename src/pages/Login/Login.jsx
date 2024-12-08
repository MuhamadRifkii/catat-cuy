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
import { resetForm } from "../../store/actions/signUp.action";

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
    }

    /* Alternate login using axios */

    // try {
    //   const response = await axiosInstance.post("/login" , {
    //     email: email,
    //     password: password
    //   })

    //   if (response.data && response.data.token) {
    //     localStorage.setItem("token", response.data.token)
    //     navigate("/dashboard");
    //   }
    // } catch (error) {
    //   if (error.response && error.response.data && error.response.data.message) {
    //     setError(error.response.data.message)
    //   } else {
    //     setError("Unknown Error")
    //   }
    // }
  };

  const handleReset = () => {
    dispatch(resetForm());
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
