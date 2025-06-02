import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Hero from "../MoviePageHero/MoviePageHero";
import Footer from "../Footer/Footer";
import CastSlider from "../CastSlider/CastSlider";
import MovieDetailsFeature from "../MovieDetailsFeature/MovieDetailsFeature";
import MoviePageTrailer from "../MoviePageTrailer/MoviePageTrailer";

import { getMovieDetails, getMovieTrailer } from "../API/apı";

const MovieDetailsPage = ({ user }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerId, setTrailerId] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const movieId = "movie123"; // Örnek film ID
  const isLoggedIn = true; 

  useEffect(() => {
    const fetchMovie = async () => {
      const movieData = await getMovieDetails(id);
      const trailerData = await getMovieTrailer(id);
      setMovie(movieData);
      setTrailerId(trailerData);
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <div className="loading">Loading...</div>;

  return (
    <>
      <Hero movie={movie} trailerId={trailerId} />
      <MovieDetailsFeature movie={movie} />
      <MoviePageTrailer trailerId={trailerId} />
      <CastSlider movieId={id} />

      {isAuthModalOpen && (
        <div className="auth-popup">
          <div className="auth-box">
            <p>You must be logged in to comment.</p>
            <button onClick={() => setIsAuthModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default MovieDetailsPage;
