import React from "react";
import "./MoviePageTrailer.css";

const MoviePageTrailer = ({ trailerId }) => {
  if (!trailerId) return null;

  return (
    <section className="hero-container">
      <div className="trailer-wrapper">
        <iframe
          src={`https://www.youtube.com/embed/${trailerId}`}
          title="Movie Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
};

export default MoviePageTrailer;
