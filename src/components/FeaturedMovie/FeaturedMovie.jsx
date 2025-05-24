import React, { useEffect, useState } from "react";
import "./featuredMovie.css";
import {
  getPopularMovies,
  getMovieDetails,
  genreMap,
  getImageUrl,
} from "../API/apı";

const FeaturedMovie = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        const popularMovies = await getPopularMovies();
        const firstMovie = popularMovies[0];
        const details = await getMovieDetails(firstMovie.id);
        setMovie(details);
      } catch (error) {
        console.error("Error fetching featured movie:", error);
      }
    }

    fetchMovie();
  }, []);

  if (!movie) return null;

  const genres = movie.genres.map((genre) => genre.name).join(", ");
  const poster = getImageUrl(movie.backdrop_path || movie.poster_path);

  return (
    <>
      <section className="featurest" id="featurest">
        <div className="featured-title">
          <h2>Movie of the Month</h2>
        </div>
        <div className="featured-movie">
          <div className="movie-container">
            <div className="movie-poster">
              <img src={poster} alt={`${movie.title} Poster`} />
            </div>
            <div className="movie-info">
              <h2>Movie of the Month</h2>
              <h3>{movie.title}</h3>
              <p>{movie.overview}</p>
              <ul>
                <li>
                  <strong>Genre:</strong> {genres}
                </li>
                <li>
                  <strong>Director:</strong> Unknown
                </li>
                <li>
                  <strong>Duration:</strong> {movie.runtime} min
                </li>
                <li>
                  <strong>Release Year:</strong>{" "}
                  {movie.release_date.slice(0, 4)}
                </li>
                <li>
                  <strong>Rating:</strong> {movie.vote_average}/10
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedMovie;
