import React, { useState, useEffect } from "react";
import MovieModal from "../MovieModal/MovieModal"; // Modal component importu
import "./FavoriteMovies.css";

const FavoriteMovies = () => {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState("all");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null); // Modal için seçilen film id

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setMovies(stored);
  }, []);

  useEffect(() => {
    if (filter === "all") {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter((movie) =>
        movie.genres?.some((g) => g.name.toLowerCase() === filter.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  }, [filter, movies]);

  const allGenres = Array.from(
    new Set(movies.flatMap((m) => m.genres?.map((g) => g.name) || []))
  );

  if (movies.length === 0) {
    return <p className="no-favorites">Favori filminiz yok.</p>;
  }

  return (
    <div className="favorite-movies-container">
      <div className="filter-wrapper">
        <label htmlFor="genre-filter">Tür filtrele:</label>
        <select
          id="genre-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Tüm Türler</option>
          {allGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {filteredMovies.length === 0 ? (
        <p className="no-favorites">Bu türde favori film yok.</p>
      ) : (
        <div className="movieverse-grid">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="movieverse-card"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
              }}
              title={movie.title}
              onClick={() => setSelectedMovieId(movie.id)} // Card tıklanırsa modal açılır
            >
              <div className="movieverse__card-box">
                <h3 className="movieverse-movie-name">{movie.title}</h3>
                <p className="movieverse-genres">
                  {movie.genres?.map((g) => g.name).join(", ") ||
                    "Tür bilgisi yok"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal, selectedMovieId doluysa göster */}
      {selectedMovieId && (
        <MovieModal
          movieId={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
        />
      )}
    </div>
  );
};

export default FavoriteMovies;
