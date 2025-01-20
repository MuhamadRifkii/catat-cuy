/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import Searchbar from "./Searchbar";
import { useDispatch } from "react-redux";
import { resetForm } from "../store/actions/login.action";
import { MdClose, MdSearch } from "react-icons/md";
import { useSpring, animated } from "@react-spring/web";

export default function Navbar({ token, userInfo, setFilter, filterValue }) {
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

  const rotateSearch = useSpring({
    transform: isSearchOpen ? "rotate(90deg)" : "rotate(0deg)",
    config: { tension: 300, friction: 25 },
  });

  return (
    <div className="sticky top-0 z-50 bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      {token && (
        <div className="md:hidden flex items-center">
          <animated.div style={rotateSearch}>
            {!isSearchOpen ? (
              <MdSearch
                className={`text-xl ${
                  userInfo
                    ? "text-slate-800 cursor-pointer"
                    : "text-slate-400 cursor-not-allowed"
                }`}
                onClick={() => userInfo && setSearchOpen(true)}
              />
            ) : (
              <MdClose
                className={`text-xl ${
                  userInfo
                    ? "text-slate-800 cursor-pointer"
                    : "text-slate-400 cursor-not-allowed"
                }`}
                onClick={() => userInfo && setSearchOpen(false)}
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
          <Link
            to="/"
            className="cursor-pointer"
            onClick={() => window.location.reload()}
          >
            <h2>Catat Cuy</h2>
          </Link>
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

      {userInfo && !isSearchOpen && (
        <div className="hidden md:block">
          <Searchbar
            value={filterValue}
            onChange={(e) => setFilter(e.target.value)}
            onClearSearch={onClearSearch}
          />
        </div>
      )}

      {token && (
        <div className="md:flex items-center gap-3">
          <Profile
            userInfo={userInfo}
            isSearchOpen={isSearchOpen}
            logout={logout}
          />
        </div>
      )}
    </div>
  );
}
