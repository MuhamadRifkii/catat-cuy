import { useState } from "react";
import Navbar from "../../component/Navbar/Navbar";
import Password from "../../component/Input/Password";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Nama tidak boleh kosong");
      return;
    }

    if (!validateEmail(email)) {
      setError("Masukkan alamat email yang valid");
      return;
    }

    if (!password) {
      setError("Password tidak boleh kosong");
      return;
    }

    setError("");

    //Signup API call
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">Buat Akun</h4>

            <input
              type="text"
              placeholder="Nama"
              className="input-container"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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
              Daftar
            </button>

            <p className="text-sm text-center mt-4">
              Sudah punya akun?{" "}
              <Link to="/login" className="font-medium text-primary underline">
                Masuk akun
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
