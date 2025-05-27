import React from "react";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Hero from "./components/Hero/Hero";
import Movies from "./components/Movies/Movies";
import Series from "./components/Series/Series";
import FeaturedMovie from "./components/FeaturedMovie/FeaturedMovie";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Movieverse from "./components/pages/Movieverse";

const App = () => {
  return (
    <>
      <Navbar />
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
    </>
  );
};

export default App;
