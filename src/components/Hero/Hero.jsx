import React from "react";
import "./hero.css";

const Hero = () => {
  return (
    <>
      <section className="hero" id="hero">
        <div className="movie-card">
          <div className="movie__card-box">
            <h1 className="movie-title">Film ismi Gelcek</h1>
            <span>Film Türü Gelecek</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
