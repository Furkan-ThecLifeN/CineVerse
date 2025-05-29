import React, { useEffect, useState } from "react";
import { getMovieCast } from "../API/apı";
import "./CastSlider.css";

const CastSlider = ({ movieId }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    if (!movieId) return;
    const fetchCast = async () => {
      const castData = await getMovieCast(movieId);
      const filteredCast = castData.filter((actor) => actor.profile_path); // Sadece resmi olanlar
      setCast(filteredCast);
    };
    fetchCast();
  }, [movieId]);

  if (cast.length === 0) return <p>Loading cast...</p>;

  const castDouble = [...cast, ...cast]; // Sonsuz döngü için

  return (
    <section className="cast-slider-wrapper">
      <div className="cast-slider">
        {castDouble.map((actor, index) => (
          <div key={`${actor.cast_id}-${index}`} className="cast-card">
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              loading="lazy"
            />
            <h4>{actor.name}</h4>
            <p className="character">{actor.character}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CastSlider;
