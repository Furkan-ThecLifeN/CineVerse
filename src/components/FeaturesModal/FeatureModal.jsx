import React, { useEffect, useState } from "react";
import { getMovieDetails, getMovieTrailer } from "../API/apı";
import "./FeatureModal.css";

const FeatureModal = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const movieData = await getMovieDetails(movieId);
        const trailer = await getMovieTrailer(movieId);
        setMovie(movieData);
        setTrailerKey(trailer);
      } catch (error) {
        console.error("Error fetching movie details or trailer:", error);
      }
    }
    fetchData();
  }, [movieId]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favs.some((m) => m.id === movieId));
  }, [movieId]);

  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      const updated = favs.filter((m) => m.id !== movieId);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
      showToast("Film favorilerden kaldırıldı");
    } else {
      if (movie) {
        favs.push(movie);
        localStorage.setItem("favorites", JSON.stringify(favs));
        setIsFavorite(true);
        showToast("Film favorilere eklendi");
      }
    }
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000); 
  };

  if (!movie || !trailerKey) return null;

  return (
    <>
      {toastMessage && <div className="movies-modal-toast">{toastMessage}</div>}
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-container"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="modal-left">
            <div className="modal-video">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Trailer"
                allowFullScreen
                frameBorder="0"
              ></iframe>
            </div>
          </div>
          <div className="modal-right">
            <h2 id="modal-title">{movie.title}</h2>
            <p>{movie.overview}</p>
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Rating:</strong> {movie.vote_average}
            </p>
            <div className="modal-buttons">
              <button
                className={`favorite-btn ${isFavorite ? "remove" : "add"}`}
                onClick={toggleFavorite}
              >
                {isFavorite ? "Favorilerden Kaldır" : "Favorilere Ekle"}
              </button>
              <button className="close-btn" onClick={onClose}>
                Kapat
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureModal;
