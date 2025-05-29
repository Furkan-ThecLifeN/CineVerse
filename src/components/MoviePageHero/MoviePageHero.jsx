import React from "react";
import "./MoviePageHero.css";
import { getImageUrl } from "../API/apı";

const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const MoviePageHero = ({ movie }) => {
  if (!movie) {
    return (
      <section className="hero" style={{ background: "#000" }}>
        <p style={{ color: "white", textAlign: "center", paddingTop: "300px" }}>
          Loading movie...
        </p>
      </section>
    );
  }

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, #121212 100%), url(${getImageUrl(
          movie.backdrop_path
        )})`,
      }}
    >
      <div
        className="movie-card"
        style={{
          backgroundImage: `url(${getImageUrl(movie.poster_path)})`,
        }}
      >
        <div className="movie__card-box">
          <h1 className="movie-title">{movie.title}</h1>
          <span>
            {movie.genre_ids?.length ? genreMap[movie.genre_ids[0]] : ""}
          </span>
        </div>
      </div>
    </section>
  );
};

export default MoviePageHero;
