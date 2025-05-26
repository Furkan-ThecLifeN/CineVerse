import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMenu, IoClose } from "react-icons/io5";
import "./navbar.css";

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

  // Component unmount olunca overflow'u sıfırla (önlem)
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
          <a href="./home" className="nav__logo-a">
            Cine<span>Verse</span>
          </a>
        </div>

        <div className="nav__links">
          <a href="#hero" className="nav__link">
            Home
          </a>
          <a href="#movies" className="nav__link">
            Movies
          </a>
          <a href="#series" className="nav__link">
            Series
          </a>
          <a href="#featurest" className="nav__link">
            News
          </a>
        </div>

        <div className="nav-icons">
          <FaSearch className="nav__icon" />
          <IoMenu className="nav__icon nav__menu-icon" onClick={openMenu} />
        </div>
      </nav>

      {isOpen && <div className="sidebar__overlay" onClick={closeMenu}></div>}

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <IoClose className="sidebar__close-icon" onClick={closeMenu} />
        <a href="#hero" className="sidebar__link" onClick={closeMenu}>
          Home
        </a>
        <a href="#movies" className="sidebar__link" onClick={closeMenu}>
          Movies
        </a>
        <a href="#series" className="sidebar__link" onClick={closeMenu}>
          Series
        </a>
        <a href="./home" className="sidebar__link" onClick={closeMenu}>
          News
        </a>
      </div>
    </>
  );
};

export default Navbar;
