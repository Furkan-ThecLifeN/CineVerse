import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieTrailer } from "../API/apı";
import Hero from "../MoviePageHero/MoviePageHero";
import Footer from "../Footer/Footer";
import MovieDetailsFeature from "../MovieDetailsFeature/MovieDetailsFeature";
import CastSlider from "../CastSlider/CastSlider";
import MoviePageTrailer from "../MoviePageTrailer/MoviePageTrailer";
import MovieCommentSection from "../MovieCommentSection/MovieCommentSection";

const MovieDetailsPage = () => {
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
      <MovieCommentSection />
      <Footer />
    </>
  );
};

export default MovieDetailsPage;
