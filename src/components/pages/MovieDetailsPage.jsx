import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Hero from "../MoviePageHero/MoviePageHero";
import Footer from "../Footer/Footer";
import CastSlider from "../CastSlider/CastSlider";
import MovieDetailsFeature from "../MovieDetailsFeature/MovieDetailsFeature";
import MoviePageTrailer from "../MoviePageTrailer/MoviePageTrailer";
import CommentSection from "../Comment/Comment";

import { getMovieDetails, getMovieTrailer } from "../API/apı"; // Bu API fonksiyonlarını kullanmaya devam et

const MovieDetailsPage = ({ user, onLoginClick }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerId, setTrailerId] = useState(null);

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
      <CastSlider movieId={id} />
      <MovieDetailsFeature movie={movie} />
      <MoviePageTrailer trailerId={trailerId} />
      <CommentSection movieId={id} user={user} onLoginClick={onLoginClick} />
      <Footer />
    </>
  );
};

export default MovieDetailsPage;
