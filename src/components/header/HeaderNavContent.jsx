import React, { useState, useEffect } from "react";
import SearchResumePopup from "./SearchResumePopup";
import { Link, useLocation } from "react-router-dom";
import { isActiveParent } from "../../utils/linkActiveChecker";
import {
  blogItems,
  candidateItems,
  employerItems,
  findJobItems,
  homeItems,
  pageItems,
  shopItems,
} from "../../data/mainMenuData";
// Import your icons (e.g., Font Awesome icons or your own SVGs)
import { FaBell, FaEnvelope, FaUserCircle } from "react-icons/fa";

const HeaderNavContent = () => {
  const { pathname } = useLocation();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in (e.g., based on the presence of a token in localStorage)
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleSearchClick = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <>
      <nav className="nav main-menu">
        <ul className="navigation" id="navbar">
          <li
            className={`${
              isActiveParent(employerItems, pathname) || pathname?.split("/")[1] === "employers-dashboard"
                ? "current"
                : ""
            } dropdown`}
          >
            <span className="text-white">Jobs</span>
            <ul>
              <li className={pathname?.includes("/employers-dashboard") ? "current" : ""}>
                <Link to="/employers-dashboard/post-jobs">Post Job</Link>
              </li>
              <li className={pathname?.includes("/employers-dashboard") ? "current" : ""}>
                <Link to="/employers-dashboard/manage-jobs">Manage Jobs</Link>
              </li>
            </ul>
          </li>
          <li className="text-white">
            <Link to="/candidates-list-v2">
              <button className="text-white font-semibold">Search Resume</button>
            </Link>
          </li>

          <li
            className={`${
              isActiveParent(candidateItems, pathname) ||
              pathname?.split("/")[1] === "candidates-dashboard"
                ? "current"
                : ""
            } dropdown`}
          >
            <Link className="text-white" to="/showcase/org">View</Link>
          </li>
          <li className="border h-[80%] p-0 m-0"></li>

          {!isLoggedIn ? (
            <>
              <li className="hover:bg-slate-200 rounded-md ml-2">
                <Link to="/" className="text-white">
                  <span className="font-light text-white"> Recruiting</span>? Post a job
                </Link>
              </li>
              <li className="text-white">
                <button onClick={handleDropdownToggle} className="text-white font-semibold">Contact Us</button>
              </li>
            </>
          ) : (
            <>
             
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default HeaderNavContent;
