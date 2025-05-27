import React, { useEffect, useState } from "react";
import "./hero.css";
import { getPopularMovies, getImageUrl } from "../API/apı";

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

const Hero = () => {
  const [movies, setMovies] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getPopularMovies();
      setMovies(data.slice(0, 5));
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [movies]);

  const currentMovie = movies[current];

  return (
    <section
      className="hero"
      id="hero"
      style={{
        backgroundImage: currentMovie
          ? `linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, #121212 100%), url(${getImageUrl(
              currentMovie.backdrop_path
            )})`
          : undefined,
      }}
    >
      <div
        className="movie-card"
        style={{
          backgroundImage: currentMovie
            ? `url(${getImageUrl(currentMovie.poster_path)})`
            : undefined,
        }}
      >
        <div className="movie__card-box">
          <h1 className="movie-title">
            {currentMovie ? currentMovie.title : "Loading..."}
          </h1>
          <span>
            {currentMovie?.genre_ids?.length
              ? genreMap[currentMovie.genre_ids[0]]
              : ""}
          </span>
        </div>
      </div>

      <div className="slider-indicators">
        {movies.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? "active" : ""}`}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default Hero;
