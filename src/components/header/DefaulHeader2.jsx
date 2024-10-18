import { IoLogOutOutline } from "react-icons/io5";
import logo from "../../Images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderNavContent from "./HeaderNavContent";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { logout, toggleSignupDialog } from "@/store/slices/auth";
import { FaBell, FaEnvelope, FaUserCircle } from "react-icons/fa";

const DefaulHeader2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userToken } = useSelector((state) => state.auth);
  const [navbar, setNavbar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const handleCheck = (type) => {
    switch (type) {
      case "job-post":
        if (!userToken) dispatch(toggleSignupDialog());
        else navigate("/employers-dashboard/post-jobs");
        break;
      default:
        break;
    }
  };

  const toggleDropdown = (event) => {
    event.stopPropagation(); // Prevent this click from being detected as a click outside
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-dropdown") && !event.target.closest(".profile-icon")) {
        closeDropdown();
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header
      style={{ backgroundColor: "#4C3957" }}
      className={`main-header font-bold border z-10 ${
        navbar ? "fixed-header animated slideInDown" : ""
      }`}
    >
      <div className="main-box">
        <div className="nav-outer">
          <div className="logo-box">
            <div className="me-10">
              <Link to="/employers-dashboard/dashboard">
                <img alt="brand" src={logo} className="h-16 p-2" />
              </Link>
            </div>
          </div>
          <HeaderNavContent />
        </div>

        <div className="outer-box">
          <div className="btn-box">
            {userToken ? (
              <>
                <div className="flex gap-4 pt-2 me-3">
                  <FaBell className="text-white text-xl" />
                  <FaEnvelope className="text-white text-xl" />
                  
                  {/* Profile Icon with Dropdown */}
                  <div className="relative">
                    <FaUserCircle
                      className="text-white text-xl cursor-pointer profile-icon"
                      onClick={toggleDropdown}
                    />
                    {isDropdownOpen && (
                      <div className="absolute top-8 right-0 mt-2 w-40 bg-white shadow-lg rounded-md profile-dropdown z-50">
                        <ul className="text-gray-800">
                          <li className="hover:bg-gray-200 px-4 py-2 cursor-pointer">
                            <Link to="/employers-dashboard/dashboard" onClick={closeDropdown}>Dashboard</Link>
                          </li>
                          <li className="hover:bg-gray-200 px-4 py-2 cursor-pointer">
                            <Link to="/employers-dashboard/my-profile" onClick={closeDropdown}>Profile</Link>
                          </li>
                          <li className="hover:bg-gray-200 px-4 py-2 cursor-pointer">
                            <button
                              className="flex items-center"
                              onClick={() => {
                                dispatch(logout());
                                closeDropdown();
                              }}
                            >
                              <IoLogOutOutline size={20} className="mr-2" />
                              Logout
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  className="bg-gray-500 p-3 ml-2 duration-500 hover:bg-[#E60278]"
                  title="logout"
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  <IoLogOutOutline size={24} />
                </Button>
              </>
            ) : (
              <button
                className="theme-btn btn-style-three call-modal p-2 text-blue-950 text-lg px-3 font-light"
                onClick={() => {
                  dispatch(toggleSignupDialog());
                }}
              >
                Sign Up
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DefaulHeader2;
