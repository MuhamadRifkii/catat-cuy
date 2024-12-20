/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../Cards/Profile";
import Searchbar from "../Searchbar/Searchbar";
import { useDispatch } from "react-redux";
import { resetForm } from "../../store/actions/login.action";
import { MdClose, MdMenu, MdSearch } from "react-icons/md";
import { useSpring, animated } from "@react-spring/web";

export default function Navbar({ userInfo, setFilter, filterValue }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
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

  const rotateHamburger = useSpring({
    transform: isDropdownOpen ? "rotate(90deg)" : "rotate(0deg)",
    config: { tension: 300, friction: 25 },
  });

  const rotateSearch = useSpring({
    transform: isSearchOpen ? "rotate(90deg)" : "rotate(0deg)",
    config: { tension: 300, friction: 25 },
  });

  return (
    <div className="sticky top-0 z-50 bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      {userInfo && (
        <div className="md:hidden flex items-center">
          <animated.div style={rotateSearch}>
            {!isSearchOpen ? (
              <MdSearch
                className="text-xl text-slate-800 cursor-pointer"
                onClick={() => setSearchOpen(true)}
              />
            ) : (
              <MdClose
                className="text-xl text-slate-800 cursor-pointer"
                onClick={() => setSearchOpen(false)}
              />
            )}
          </animated.div>
        </div>
      )}

      {!isSearchOpen && (
        <div
          className={`sm:text-xl text-sm font-medium text-black py-2 ${
            !userInfo && "flex-1 text-center md:text-left"
          }`}
        >
          <h2 className="">{userInfo ? "Catat Cuy" : "Catat Cuy"}</h2>
        </div>
      )}

      {isSearchOpen && userInfo && (
        <div className="flex-grow mx-4">
          <Searchbar
            value={filterValue}
            onChange={(e) => setFilter(e.target.value)}
            onClearSearch={onClearSearch}
          />
        </div>
      )}

      {!isSearchOpen && userInfo && (
        <div
          className="md:hidden flex items-center cursor-pointer"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          <animated.div style={rotateHamburger}>
            {isDropdownOpen ? (
              <MdClose className="text-xl text-slate-800" />
            ) : (
              <MdMenu className="text-xl text-slate-800" />
            )}
          </animated.div>
        </div>
      )}

      {userInfo && !isSearchOpen && (
        <div className="hidden md:block">
          <Searchbar
            value={filterValue}
            onChange={(e) => setFilter(e.target.value)}
            onClearSearch={onClearSearch}
          />
        </div>
      )}

      <div className="hidden md:flex items-center gap-3">
        <Profile userInfo={userInfo} logout={logout} />
      </div>

      {isDropdownOpen && (
        <div className="absolute top-14 right-0 bg-white border border-gray-300 shadow-lg rounded-md p-3 w-48">
          <p className="text-sm font-medium text-slate-800">{userInfo?.name}</p>
          <button
            className="text-sm text-red-500 w-full text-left mt-2"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
