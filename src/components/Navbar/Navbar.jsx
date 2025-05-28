import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { IoMenu, IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "./navbar.css";

const Navbar = ({ onAuthButtonClick, user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  const openMenu = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="nav__logo">
          <img src="./logo.png" alt="logo" className="logo-img" />
          <Link to="/" className="nav__logo-a">
            Cine<span>Verse</span>
          </Link>
        </div>

        <div className="nav__links">
          <HashLink smooth to="/#hero" className="nav__link">
            Home
          </HashLink>

          <Link to="/movieverse" className="nav__link">
            MovieVerse
          </Link>

          <Link to="/favorites" className="nav__link">
            Favorites
          </Link>
        </div>
        <div className="sign-up-box">
          <div className="sign-up">
            {!user ? (
              <button className="auth-button" onClick={onAuthButtonClick}>
                Sign In / Sign Up
              </button>
            ) : (
              <div className="user-menu-wrapper" ref={userMenuRef}>
                <button
                  className="user-menu-btn"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  aria-haspopup="true"
                  aria-expanded={showUserMenu}
                  aria-label="User menu"
                >
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.username}
                      className="user-avatar"
                    />
                  ) : (
                    <FaUserCircle className="user-avatar-icon" />
                  )}
                  <span className="user-name">{user.username}</span>
                  <svg
                    className={`dropdown-arrow ${showUserMenu ? "open" : ""}`}
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {showUserMenu && (
                  <div className="user-dropdown-menu" role="menu">
                    <button className="dropdown-logout" onClick={onLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="nav-icons">
            <IoMenu className="nav__icon nav__menu-icon" onClick={openMenu} />
          </div>
        </div>
      </nav>

      {isOpen && <div className="sidebar__overlay" onClick={closeMenu}></div>}

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <IoClose className="sidebar__close-icon" onClick={closeMenu} />
        <HashLink
          smooth
          to="/#hero"
          className="sidebar__link"
          onClick={closeMenu}
        >
          Home
        </HashLink>
        <Link to="/movieverse" className="sidebar__link" onClick={closeMenu}>
          MovieVerse
        </Link>
        <Link to="/favorites" className="sidebar__link" onClick={closeMenu}>
          Favorites
        </Link>

        {!user ? (
          <button
            className="sidebar__auth-button"
            onClick={() => {
              onAuthButtonClick();
              closeMenu();
            }}
          >
            Sign In / Sign Up
          </button>
        ) : (
          <div className="sidebar__user-info">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.username}
                className="sidebar__avatar"
              />
            ) : (
              <FaUserCircle className="sidebar__avatar-icon" />
            )}
            <span className="sidebar__username">{user.username}</span>
            <button
              className="sidebar__logout-btn"
              onClick={() => {
                onLogout();
                closeMenu();
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
