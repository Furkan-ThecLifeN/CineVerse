import React, { useEffect, useState } from "react";
import { getMovieDetails, getMovieTrailer } from "../API/apı";
import "./MovieModal.css";

const MovieModal = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [trailerId, setTrailerId] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showNotification, setShowNotification] = useState("");

  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async () => {
      const data = await getMovieDetails(movieId);
      const trailer = await getMovieTrailer(movieId);
      setMovie(data);
      setTrailerId(trailer);

      try {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setIsFavorite(favorites.some((fav) => fav.id === data.id));
      } catch {
        setIsFavorite(false);
      }
    };

    fetchMovie();

    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [movieId]);

  const handleToggleFavorite = () => {
    try {
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

      if (isFavorite) {
        favorites = favorites.filter((fav) => fav.id !== movie.id);
        setShowNotification("Removed from favorites");
      } else {
        // Aynı filmi tekrar eklemeyi önle
        if (!favorites.some((fav) => fav.id === movie.id)) {
          favorites.push(movie);
          setShowNotification("Added to favorites");
        }
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(!isFavorite);
      setTimeout(() => setShowNotification(""), 3000);
    } catch (error) {
      console.error("LocalStorage error:", error);
    }
  };

  if (!movie) return null;

  return (
    <div className="modal-overlay">
      {showNotification && (
        <div className="movies-modal-toast">{showNotification}</div>
      )}

      <div className="movies-modal-box">
        {trailerId && (
          <div className="movies-modal-video">
            <iframe
              src={`https://www.youtube.com/embed/${trailerId}`}
              title={movie.title}
              allowFullScreen
            ></iframe>
          </div>
        )}

        <div className="movies-modal-content">
          <h2 className="movies-modal-title">{movie.title}</h2>
          <p className="movies-modal-description">{movie.overview}</p>
          <div className="movies-modal-info-grid">
            <p>
              <strong>Genre:</strong>{" "}
              {movie.genres.map((g) => g.name).join(", ")}
            </p>
            <p>
              <strong>Release Year:</strong> {movie.release_date.slice(0, 4)}
            </p>
            <p>
              <strong>Rating:</strong> {movie.vote_average}
            </p>
            <p>
              <strong>Runtime:</strong> {movie.runtime} min
            </p>
          </div>

          <div className="movies-modal-buttons">
            <button
              onClick={handleToggleFavorite}
              className={`fav-btn ${isFavorite ? "remove" : "add"}`}
            >
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
            <button onClick={onClose} className="close-btn">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
