import React from 'react'
import "./movies.css"

const Movies = () => {
  return (
    <>
      <section className="movies" id="movies">
        <div className="movies-hood">
          <h2>Movies</h2>
          <a href="./movies">See all</a>
        </div>
        <div className="movies-cards">
          <div className="movie-card movie-container">
            <div className="movies__card-box">
              <h3>Film ismi</h3>
              <span>Film Türü</span>
            </div>
          </div>
          <div className="movie-card movie-container">
            <div className="movies__card-box ">
              <h3>Film ismi</h3>
              <span>Film Türü</span>
            </div>
          </div>
          <div className="movie-card movie-container">
            <div className="movies__card-box">
              <h3>Film ismi</h3>
              <span>Film Türü</span>
            </div>
          </div>
          <div className="movie-card movie-container">
            <div className="movies__card-box">
              <h3>Film ismi</h3>
              <span>Film Türü</span>
            </div>
          </div>
          <div className="movie-card movie-container">
            <div className="movies__card-box">
              <h3>Film ismi</h3>
              <span>Film Türü</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Movies