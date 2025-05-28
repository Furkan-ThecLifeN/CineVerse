import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Hero from "./components/Hero/Hero";
import Movies from "./components/Movies/Movies";
import Series from "./components/Series/Series";
import FeaturedMovie from "./components/FeaturedMovie/FeaturedMovie";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Movieverse from "./components/pages/Movieverse";
import AuthModal from "./components/AuthModal/AuthModal";

const App = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null); // { username, email, avatarUrl? }

  // Kullanıcı giriş/kayıt başarılı olunca çağrılır
  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  // Çıkış yapıldığında kullanıcı bilgisi sıfırlanır
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
