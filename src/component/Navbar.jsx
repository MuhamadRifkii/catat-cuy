/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import Searchbar from "./Searchbar";
import { useDispatch } from "react-redux";
import { resetForm } from "../store/actions/login.action";
import { resetNotes } from "../store/actions/home.action";
import { MdClose, MdSearch } from "react-icons/md";
import { useSpring, animated } from "@react-spring/web";
import { AnimatePresence } from "framer-motion";

export default function Navbar({ token, userInfo, setFilter, filterValue }) {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [showAppName, setShowAppName] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(resetForm());
    dispatch(resetNotes());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const onClearSearch = () => {
    setFilter("");
  };

  const rotateSearch = useSpring({
    transform: isSearchOpen ? "rotate(90deg)" : "rotate(0deg)",
    config: { tension: 300, friction: 25 },
  });

  const openSearch = () => {
    if (userInfo) {
      setShowAppName(false);
      setSearchOpen(true);
    }
  };

  const closeSearch = () => {
    if (userInfo) {
      setSearchOpen(false);
    }
  };

  return (
    <div className="sticky top-0 z-50 h-14 bg-[var(--bg-color)] bottom-border flex items-center justify-between px-6 py-2 drop-shadow-xl">
      {token && (
        <div className="md:hidden flex items-center">
          <animated.div style={rotateSearch}>
            {!isSearchOpen ? (
              <MdSearch
                className={`text-xl ${
                  userInfo ? "cursor-pointer" : "cursor-not-allowed"
                }`}
                style={{ color: "var(--main)" }}
                onClick={openSearch}
              />
            ) : (
              <MdClose
                className={`text-xl ${
                  userInfo ? "cursor-pointer" : "cursor-not-allowed"
                }`}
                style={{ color: "var(--main)" }}
                onClick={closeSearch}
              />
            )}
          </animated.div>
        </div>
      )}

      {showAppName && (
        <div
          className={`sm:text-xl text-lg font-medium text-black ${
            !userInfo && "relative flex-1 text-center md:text-left"
          }`}
        >
          <a href="/" className="cursor-pointer">
            <h2 style={{ color: "var(--main)" }}>Catat Cuy</h2>
          </a>
        </div>
      )}

      <AnimatePresence onExitComplete={() => setShowAppName(true)}>
        {isSearchOpen && userInfo && (
          <div className="flex-grow mx-4">
            <Searchbar
              value={filterValue}
              onChange={(e) => setFilter(e.target.value)}
              onClearSearch={onClearSearch}
            />
          </div>
        )}
      </AnimatePresence>

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
          <Menu userInfo={userInfo} logout={logout} />
        </div>
      )}
    </div>
  );
}
