import React, { useEffect, useState, useCallback } from "react";
import Hero from "../Hero/Hero";
import FavoriteMovies from "../FavoriteMovies/FavoriteMovies";
import Footer from "../Footer/Footer";

const FavoriteMoviesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  // LocalStorage'dan favorileri çek
  const fetchFavorites = useCallback(() => {
    const favs = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    setFavorites(favs);
  }, []);

  // Filtre uygula (genre bazlı)
  useEffect(() => {
    if (!selectedGenre) {
      setFilteredFavorites(favorites);
    } else {
      const filtered = favorites.filter(
        (movie) => movie.genres?.includes(selectedGenre) // veya movie.genre ise ona göre değiştir
      );
      setFilteredFavorites(filtered);
    }
  }, [favorites, selectedGenre]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return (
    <>
      <Hero />
      <div className="movieverse-wrapper">
        <h2 className="movieverse-title">Favori Filmlerim</h2>
        <FavoriteMovies movies={filteredFavorites} />
      </div>
      <Footer />
    </>
  );
};

export default FavoriteMoviesPage;
