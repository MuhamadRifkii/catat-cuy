/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../Cards/Profile";
import Searchbar from "../Searchbar/Searchbar";
import { useDispatch } from "react-redux";
import { resetForm } from "../../store/actions/login.action";
import { getInitials } from "../../utils/helper";

export default function Navbar({ userInfo, setFilter, filterValue }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(resetForm());
    localStorage.clear();
    navigate("/login");
  };

  const onClearSearch = () => {
    setFilter("");
  };

  return (
    <div className="sticky top-0 z-50 bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Catat Cuy</h2>

      {userInfo && (
        <Searchbar
          value={filterValue}
          onChange={(e) => setFilter(e.target.value)}
          onClearSearch={onClearSearch}
        />
      )}

      {/* Profile Section */}
      <div className="relative">
        {/* Profile Icon on Large Screen */}
        <div className="hidden md:flex items-center gap-3">
          <Profile userInfo={userInfo} logout={logout} />
        </div>

        {/* Profile Icon for Mobile */}
        <div
          className="md:hidden flex items-center gap-3 cursor-pointer"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          {userInfo && <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
            {getInitials(userInfo?.name)}
          </div>}
        </div>

        {/* Dropdown Menu for Mobile */}
        {isDropdownOpen && (
          <div className="absolute top-14 right-0 bg-white border border-gray-300 shadow-lg rounded-md p-3 w-48">
            <p className="text-sm font-medium text-slate-800">
              {userInfo?.name}
            </p>
            <button
              className="text-sm text-red-500 w-full text-left mt-2"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
