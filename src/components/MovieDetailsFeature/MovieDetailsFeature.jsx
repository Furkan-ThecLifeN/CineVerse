import React from "react";
import "./MovieDetailsFeature.css";

const MovieDetailsSection = ({ movie }) => {
  if (!movie) return null;

  const genres =
    movie.genres?.map((genre) => genre.name).join(", ") || "Unknown";

  return (
    <section className="movie-info-box">
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <ul className="movie-info-list">
        <li>
          <strong>Genre:</strong> <span>{genres}</span>
        </li>
        <li>
          <strong>Duration:</strong> <span>{movie.runtime} min</span>
        </li>
        <li>
          <strong>Release Date:</strong> <span>{movie.release_date}</span>
        </li>
        <li>
          <strong>Rating:</strong> <span>{movie.vote_average}/10</span>
        </li>
        <li>
          <strong>Status:</strong> <span>{movie.status}</span>
        </li>
        <li>
          <strong>Budget:</strong>{" "}
          <span>${movie.budget?.toLocaleString()}</span>
        </li>
        <li>
          <strong>Revenue:</strong>{" "}
          <span>${movie.revenue?.toLocaleString()}</span>
        </li>
      </ul>
    </section>
  );
};

export default MovieDetailsSection;
