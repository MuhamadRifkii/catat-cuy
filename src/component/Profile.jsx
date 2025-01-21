/* eslint-disable react/prop-types */
import { getInitials } from "../utils/helper";
import { MdMenu, MdClose } from "react-icons/md";
import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Link, useLocation } from "react-router-dom";

export default function Profile({ userInfo, isSearchOpen, logout }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const rotateHamburger = useSpring({
    transform: isDropdownOpen ? "rotate(90deg)" : "rotate(0deg)",
    config: { tension: 300, friction: 25 },
  });

  return (
    <div className="flex items-center gap-3">
      {userInfo && (
        <div className="hidden md:flex w-12 h-12 items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
          {getInitials(userInfo?.name)}
        </div>
      )}
      {!isSearchOpen && (
        <div
          className="flex items-center cursor-pointer"
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

      {isDropdownOpen && (
        <div className="absolute top-14 right-0 bg-white border border-gray-300 shadow-lg rounded-md p-3 w-48">
          {userInfo ? (
            <>
              <p className="text-sm font-medium text-slate-800">
                {userInfo?.name}
              </p>
              {location.pathname === "/dashboard" ? (
                <Link to="/saran" className="cursor-pointer">
                  <p className="text-sm font-medium text-slate-800 w-full text-left mt-2">
                    Saran
                  </p>
                </Link>
              ) : location.pathname === "/saran" ? (
                <Link to="/dashboard" className="cursor-pointer">
                  <p className="text-sm font-medium text-slate-800 w-full text-left mt-2">
                    Dashboard
                  </p>
                </Link>
              ) : null}
              <button
                className="text-sm text-red-500 w-full text-left mt-2"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className="text-sm text-red-500 w-full text-left"
              onClick={logout}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
}
