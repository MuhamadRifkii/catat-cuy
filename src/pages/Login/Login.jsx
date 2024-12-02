import { Link } from "react-router-dom";
import Navbar from "../../component/Navbar/Navbar";
import Password from "../../component/Input/Password";
import { useState } from "react";
import { validateEmail } from "../../utils/helper";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Masukkan alamat email yang valid");
      return;
    }

    if (!password) {
      setError("Password tidak boleh kosong");
      return;
    }

    setError("");

    //Login API call
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
              onChange={(e) => setEmail(e.target.value)}
            />

            <Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
