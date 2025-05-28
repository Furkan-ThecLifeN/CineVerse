import React, { useEffect, useState, useCallback } from "react";
import Hero from "../Hero/Hero";
import MoviesPage from "../MoviesSection/MoviesPage";
import Footer from "../Footer/Footer";
import { getPopularMovies, searchMovies, getMoviesByGenre } from "../API/apı";

const Movieverse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const fetchMovies = useCallback(async () => {
    let allMovies = [];

    if (searchTerm) {
      allMovies = await searchMovies(searchTerm, page);
    } else if (selectedGenre) {
      allMovies = await getMoviesByGenre(selectedGenre, page);
    } else {
      allMovies = await getPopularMovies(page);
    }

    const filtered = allMovies.filter((movie) => {
      const releaseYear = movie.release_date?.split("-")[0];
      const ratingPass = selectedRating
        ? movie.vote_average >= selectedRating
        : true;
      const yearPass = selectedYear ? releaseYear === selectedYear : true;
      return ratingPass && yearPass;
    });

    setMovies(filtered);
  }, [searchTerm, selectedGenre, selectedYear, selectedRating, page]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <>
      <Hero />
      <MoviesPage
        movies={movies}
        onMovieClick={(movie) => console.log("Selected movie:", movie)}
      />
      <Footer />
    </>
  );
};

export default Movieverse;
