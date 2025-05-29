import React, { useEffect, useState } from "react";
import "./RandomMovie.css";
import { getPopularMovies, getMovieDetails, getMovieTrailer } from "../API/apı";

const RandomMovie = () => {
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRandomMovie = async () => {
    setLoading(true);
    try {
      const popularMovies = await getPopularMovies();
      const randomIndex = Math.floor(Math.random() * popularMovies.length);
      const selectedMovie = popularMovies[randomIndex];

      const [movieDetails, trailer] = await Promise.all([
        getMovieDetails(selectedMovie.id),
        getMovieTrailer(selectedMovie.id),
      ]);

      setTimeout(() => {
        setMovie(movieDetails);
        setTrailerKey(trailer);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetching random movie:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomMovie();
  }, []);

  const genres = movie?.genres?.map((g) => g.name).join(", ");

  return (
    <section className="random-featured">
      <button onClick={fetchRandomMovie} className="random-button">
        Get Random Movie
      </button>

      <div className="random-container">
        {loading ? (
          <div className="random-loader"></div>
        ) : (
          movie && (
            <div className="random-card">
              <div className="random-img">
                {trailerKey ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    title="YouTube trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ borderRadius: "12px" }}
                  ></iframe>
                ) : (
                  <p style={{ color: "#fff" }}>No trailer found</p>
                )}
              </div>
              <div className="random-info">
                <h2>{movie.title}</h2>
                <p className="random-overview">{movie.overview}</p>
                <ul>
                  <li>
                    <strong>Genres:</strong> {genres}
                  </li>
                  <li>
                    <strong>Runtime:</strong> {movie.runtime} min
                  </li>
                  <li>
                    <strong>Release Year:</strong>{" "}
                    {movie.release_date?.slice(0, 4)}
                  </li>
                  <li>
                    <strong>Rating:</strong> {movie.vote_average}/10
                  </li>
                </ul>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default RandomMovie;
