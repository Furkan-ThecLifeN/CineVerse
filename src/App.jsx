import React, { useState } from "react";
import { Routes, Route } from "react-router-dom"; // Sadece Routes, Route import et
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Movies from "./components/Movies/Movies";
import Series from "./components/Series/Series";
import FeaturedMovie from "./components/FeaturedMovie/FeaturedMovie";
import Footer from "./components/Footer/Footer";
import Movieverse from "./components/pages/Movieverse";
import FavoriteMoviesPage from "./components/pages/FavoriteMoviesPage";
import MovieDetailsPage from "./components/pages/MovieDetailsPage"; // EKLENDİ
import AuthModal from "./components/AuthModal/AuthModal";
import "./App.css";
import RandomMoviePage from "./components/pages/RandomMoviePage";

const App = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null); // { username, email, avatarUrl? }

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
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
        <Route path="/favorites" element={<FavoriteMoviesPage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
        <Route path="/RandomMovie" element={<RandomMoviePage />} />
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
