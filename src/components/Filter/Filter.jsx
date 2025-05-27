import React from "react";
import "./Filter.css";

const Filter = ({
  searchTerm,
  setSearchTerm,
  selectedGenre,
  setSelectedGenre,
  selectedYear,
  setSelectedYear,
  genreMap = {},
}) => {
  return (
    <div className="movie-filter-bar">
      <input
        type="text"
        placeholder=" Search by movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        <option value="">All Genres</option>
        {Object.entries(genreMap).map(([id, name]) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>

      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        <option value="">All Years</option>
        {Array.from({ length: 30 }, (_, i) => 2025 - i).map((year) => (
          <option key={year} value={year.toString()}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
