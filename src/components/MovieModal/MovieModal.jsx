import { useEffect, useState } from "react";
import { getMovieDetails, getMovieTrailer } from "../API/apı";
import "./MovieModal.css";

const MovieModal = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [trailerId, setTrailerId] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showNotification, setShowNotification] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getMovieDetails(movieId);
      const trailer = await getMovieTrailer(movieId);
      setMovie(data);
      setTrailerId(trailer);
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setIsFavorite(favorites.some((fav) => fav.id === data.id));
    };

    if (movieId) fetchMovie();

    // Modal açılır açılmaz body'ye class ekle
    if (movieId) {
      document.body.classList.add("modal-open");
    }

    // Cleanup - Modal kapanınca class çıkar
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [movieId]);
  

  const handleToggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      favorites = favorites.filter((fav) => fav.id !== movie.id);
      setShowNotification("Removed from favorites");
    } else {
      favorites.push(movie);
      setShowNotification("Added to favorites");
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
    setTimeout(() => setShowNotification(""), 3000);
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
