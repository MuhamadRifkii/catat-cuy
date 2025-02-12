/* eslint-disable react/prop-types */
import { getInitials } from "../utils/helper";
import { MdMenu, MdClose } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./Theme";

export default function Menu({ userInfo, isSearchOpen, logout }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  const rotateHamburger = useSpring({
    transform: isDropdownOpen ? "rotate(90deg)" : "rotate(0deg)",
    config: { tension: 300, friction: 25 },
  });

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="flex items-center gap-3" ref={dropdownRef}>
      {userInfo && (
        <div className="hidden md:flex w-12 h-12 items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
          <Link to="/profile" className="cursor-pointer">
            {getInitials(userInfo?.name)}
          </Link>
        </div>
      )}
      {!isSearchOpen && (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          <animated.div style={rotateHamburger}>
            {isDropdownOpen ? (
              <MdClose className="text-xl" style={{ color: "var(--main)" }} />
            ) : (
              <MdMenu className="text-xl" style={{ color: "var(--main)" }} />
            )}
          </animated.div>
        </div>
      )}

      {isDropdownOpen && (
        <div className="absolute top-14 right-0 bg-[var(--searchbar-bg)] shadow-lg rounded-md p-3 w-48">
          {userInfo ? (
            <>
              <Link to="/profile" className="cursor-pointer">
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--main)" }}
                >
                  {userInfo?.name}
                </p>
              </Link>

              {location.pathname === "/profile" ? (
                <Link to="/dashboard" className="cursor-pointer">
                  <p
                    className="text-sm font-medium w-full text-left mt-2"
                    style={{ color: "var(--main)" }}
                  >
                    Dashboard
                  </p>
                </Link>
              ) : location.pathname === "/dashboard" ? (
                <Link to="/saran" className="cursor-pointer">
                  <p
                    className="text-sm font-medium w-full text-left mt-2"
                    style={{ color: "var(--main)" }}
                  >
                    Saran
                  </p>
                </Link>
              ) : location.pathname === "/saran" ? (
                <Link to="/dashboard" className="cursor-pointer">
                  <p
                    className="text-sm font-medium w-full text-left mt-2"
                    style={{ color: "var(--main)" }}
                  >
                    Dashboard
                  </p>
                </Link>
              ) : null}

              {/* <Link to="/pengaturan" className="cursor-pointer">
                <p
                  className="text-sm font-medium w-full text-left mt-2"
                  style={{ color: "var(--main)" }}
                >
                  Pengaturan
                </p>
              </Link> */}

              <ThemeToggle />

              <div className="border-t border-gray-300 flex-grow mt-4"></div>
              <button
                className="text-sm text-red-500 w-full text-left mt-2"
                onClick={logout}
              >
                Keluar
              </button>
            </>
          ) : (
            <button
              className="text-sm text-red-500 w-full text-left"
              onClick={logout}
            >
              Keluar
            </button>
          )}
        </div>
      )}
    </div>
  );
}
