import React from "react";
import "./featuredMovie.css";

const FeaturedMovie = () => {
  return (
    <section className="featured-movie">
      <div className="movie-container">
        <div className="movie-poster">
          <img src="/images/image.jpg" alt="Inception Poster" />
        </div>
        <div className="movie-info">
          <h2>Movie of the Month</h2>
          <h3>Inception</h3>
          <p>
            A mind-bending thriller by Christopher Nolan that delves into the
            world of dreams. Dom Cobb is a skilled thief, the best in the
            dangerous art of extraction.
          </p>
          <ul>
            <li>
              <strong>Genre:</strong> Sci-Fi, Action
            </li>
            <li>
              <strong>Director:</strong> Christopher Nolan
            </li>
            <li>
              <strong>Duration:</strong> 2h 28min
            </li>
            <li>
              <strong>Release Year:</strong> 2010
            </li>
            <li>
              <strong>Rating:</strong> 8.8/10
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMovie;
