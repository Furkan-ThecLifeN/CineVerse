import React, { useEffect, useState } from "react";
import { getMoviesByGenre, getImageUrl } from "../API/apı";
import MovieModal from "../MovieModal/MovieModal"; // Modal bileşeni import et
import "./series.css";

const genres = [
  { id: 28, title: "Action" },
  { id: 35, title: "Comedy" },
  { id: 18, title: "Drama" },
  { id: 27, title: "Horror" },
  { id: 10749, title: "Romance" },
  { id: 878, title: "Sci-Fi" },
  { id: 53, title: "Thriller" },
];

const Series = () => {
  const [genreMovies, setGenreMovies] = useState({});
  const [activeSlides, setActiveSlides] = useState({});
  const [totalSlides, setTotalSlides] = useState({});
  const [selectedMovieId, setSelectedMovieId] = useState(null); // Modal için state

  useEffect(() => {
    const fetchAllGenres = async () => {
      const moviesResult = {};
      const slideCounts = {};
      const initialSlides = {};

      for (const genre of genres) {
        const movies = await getMoviesByGenre(genre.id);
        const limitedMovies = movies.slice(0, 15); // En fazla 15 film
        moviesResult[genre.id] = limitedMovies;
        slideCounts[genre.id] = Math.ceil(limitedMovies.length / 5);
        initialSlides[genre.id] = 0;
      }

      setGenreMovies(moviesResult);
      setTotalSlides(slideCounts);
      setActiveSlides(initialSlides);
    };

    fetchAllGenres();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlides((prev) => {
        const updated = { ...prev };
        genres.forEach((genre) => {
          const total = totalSlides[genre.id] || 1;
          updated[genre.id] = (prev[genre.id] + 1) % total;
        });
        return updated;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  // Modalı kapatmak için fonksiyon
  const closeModal = () => {
    setSelectedMovieId(null);
    document.body.style.overflow = "auto"; // scroll'u aç
  };

  // Kart tıklanınca modal aç
  const handleCardClick = (movieId) => {
    setSelectedMovieId(movieId);
    document.body.style.overflow = "hidden"; // scroll'u kapat
  };

  return (
    <section className="series" id="series">
      <div className="series-title">
        <h2>Series</h2>
        <a href="/home">See all</a>
      </div>

      {genres.map((genre) => {
        const movies = genreMovies[genre.id] || [];
        const slideIndex = activeSlides[genre.id] || 0;
        const slides = totalSlides[genre.id] || 1;

        return (
          <div className="films" id={genre.title.toLowerCase()} key={genre.id}>
            <div className="films-header">
              <h2>{genre.title}</h2>
              <div className="slider-bars" style={{ "--total-bars": slides }}>
                {[...Array(slides)].map((_, index) => (
                  <div
                    key={index}
                    className={`bar ${slideIndex === index ? "active" : ""}`}
                  >
                    <span></span>
                  </div>
                ))}
              </div>
            </div>

            <div className="films-list">
              {movies.slice(slideIndex * 5, slideIndex * 5 + 5).map((movie) => (
                <div
                  className="film-card film-container"
                  key={movie.id}
                  style={{
                    backgroundImage: `url(${getImageUrl(movie.poster_path)})`,
                    cursor: "pointer",
                  }}
                  onClick={() => handleCardClick(movie.id)} // modal aç
                >
                  <div className="film-card-box">
                    <h3>{movie.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Modal burada gösterilir */}
      {selectedMovieId && (
        <div className="modal-overlay">
          <MovieModal movieId={selectedMovieId} onClose={closeModal} />
        </div>
      )}
    </section>
  );
};

export default Series;
