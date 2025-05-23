import React from "react";
import "./series.css";

const genres = [
  { id: "action", title: "Action" },
  { id: "comedy", title: "Comedy" },
  { id: "drama", title: "Drama" },
  { id: "horror", title: "Horror" },
  { id: "romance", title: "Romance" },
  { id: "sci-fi", title: "Sci-Fi" },
  { id: "thriller", title: "Thriller" },
];

const Series = () => {
  return (
    <section className="series" id="series">
      <div className="series-title">
        <h2>Series</h2>
        <a href="/home">See all</a>
      </div>

      {genres.map((genre) => (
        <div className="films" id={genre.id} key={genre.id}>
          <div className="films-header">
            <h2>{genre.title}</h2>
          </div>
          <div className="films-list">
            <div className="film-card film-container">
              <div className="film-card-box">
                <h3>Film ismi</h3>
                <span>{genre.title}</span>
              </div>
            </div>
            <div className="film-card film-container">
              <div className="film-card-box">
                <h3>Film ismi</h3>
                <span>{genre.title}</span>
              </div>
            </div>
            <div className="film-card film-container">
              <div className="film-card-box">
                <h3>Film ismi</h3>
                <span>{genre.title}</span>
              </div>
            </div>
            <div className="film-card film-container">
              <div className="film-card-box">
                <h3>Film ismi</h3>
                <span>{genre.title}</span>
              </div>
            </div>
            <div className="film-card film-container">
              <div className="film-card-box">
                <h3>Film ismi</h3>
                <span>{genre.title}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Series;
