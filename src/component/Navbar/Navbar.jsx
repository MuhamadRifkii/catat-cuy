/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import Profile from "../Cards/Profile";
import Searchbar from "../Searchbar/Searchbar";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetForm } from "../../store/actions/login.action";

export default function Navbar({ userInfo }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(resetForm());
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    // navigate(`/search?query=${searchQuery}`);
  };

  const onClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Catat Cuy</h2>

      <Searchbar
        value={searchQuery}
        onChange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      <Profile userInfo={userInfo} logout={logout} />
    </div>
  );
}
