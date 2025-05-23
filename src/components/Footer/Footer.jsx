import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer" id="footer">
        <div className="footer-container">
          <div className="footer__links-box">
            <div className="footer-logo">
              <a href="#home" className="footer__logo-a">
                Cine<span>Verse</span>
              </a>
            </div>
            <div className="footer-mail">
              <a href="mailto:">support@cineverse.com</a>
            </div>
            <div className="social-media">
              <FaFacebook className="social-link" />
              <FaXTwitter className="social-link" />
              <FaInstagram className="social-link" />
            </div>
          </div>
          <div className="footer-about">
            <div className="about-box">
              <h2>About</h2>
              <span>About Us</span>
              <span>Features</span>
              <span>News & Blogs</span>
            </div>
            <div className="about-box">
              <h2>Contact</h2>
              <span>Instagram</span>
              <span>Twitter</span>
              <span>Facebook</span>
            </div>
            <div className="about-box">
              <h2>Support</h2>
              <span>FAQs</span>
              <span>Support Centre</span>
              <span>Contact Us</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
