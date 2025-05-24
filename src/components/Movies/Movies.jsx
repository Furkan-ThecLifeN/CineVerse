import React, { useEffect, useState } from "react";
import "./movies.css";
import { getPopularMovies } from "../API/apı";

// Tür ID'sini isme çeviren map (örnek)
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
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const data = await getPopularMovies();
      setMovies(data);
    }
    fetchMovies();
  }, []);

  return (
    <>
      <section className="movies" id="movies">
        <div className="movies-hood">
          <h2>Movies</h2>
          <a href="./movies">See all</a>
        </div>
        <div className="movies-cards">
          {movies.slice(0, 5).map((movie) => (
            <div
              key={movie.id}
              className="movie-card movie-container"
              style={{
                backgroundImage: movie.poster_path
                  ? `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`
                  : "url('../../img/movie.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="movies__card-box">
                <h3>{movie.title}</h3>
                <span>{genreMap[movie.genre_ids[0]] || "Unknown"}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Movies;
