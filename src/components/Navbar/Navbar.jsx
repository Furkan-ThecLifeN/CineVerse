import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMenu, IoClose } from "react-icons/io5";
import "./navbar.css";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
    return () => {
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
          <HashLink smooth to="/#movies" className="nav__link">
            Movies
          </HashLink>
          <HashLink smooth to="/#series" className="nav__link">
            Series
          </HashLink>
          <HashLink smooth to="/#featurest" className="nav__link">
            Month
          </HashLink>
          <Link to="/movieverse" className="nav__link">
            MovieVerse
          </Link>
        </div>

        <div className="nav-icons">
          <FaSearch className="nav__icon" />
          <IoMenu className="nav__icon nav__menu-icon" onClick={openMenu} />
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
        <HashLink
          smooth
          to="/#movies"
          className="sidebar__link"
          onClick={closeMenu}
        >
          Movies
        </HashLink>
        <HashLink
          smooth
          to="/#series"
          className="sidebar__link"
          onClick={closeMenu}
        >
          Series
        </HashLink>
        <HashLink
          smooth
          to="/#featurest"
          className="sidebar__link"
          onClick={closeMenu}
        >
          Month
        </HashLink>
        <Link to="/movieverse" className="sidebar__link" onClick={closeMenu}>
          MovieVerse
        </Link>
      </div>
    </>
  );
};

export default Navbar;
