import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Movies from "./components/Movies/Movies";
import Series from "./components/Series/Series";
import FeaturedMovie from "./components/FeaturedMovie/FeaturedMovie";
import Footer from "./components/Footer/Footer";

import Movieverse from "./components/pages/Movieverse";
import FavoriteMoviesPage from "./components/pages/FavoriteMoviesPage";
import MovieDetailsPage from "./components/pages/MovieDetailsPage";
import RandomMoviePage from "./components/pages/RandomMoviePage";
import AuthModal from "./components/AuthModal/AuthModal";

const App = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${parsedUser.token}`;
    }
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsAuthModalOpen(false);
    axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <>
      <Navbar
        user={user}
        onAuthButtonClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Movies />
              <Series />
              <FeaturedMovie />
              <Footer />
            </>
          }
        />
        <Route path="/movieverse" element={<Movieverse />} />
        <Route
          path="/movie/:id"
          element={
            <MovieDetailsPage
              user={user}
              onLoginClick={() => setIsAuthModalOpen(true)}
            />
          }
        />
        <Route path="/randommovie" element={<RandomMoviePage />} />
      </Routes>

      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}
    </>
  );
};

export default App;
