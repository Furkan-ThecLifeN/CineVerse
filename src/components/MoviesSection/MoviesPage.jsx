import React, { useEffect, useState } from "react";
import { getPopularMovies, genreMap } from "../API/apı";
import Filter from "../Filter/Filter";
import MovieModal from "../MovieModal/MovieModal";
import "./MoviesPage.css";

const MOVIES_PER_PAGE = 20;
const TOTAL_PAGES_TO_FETCH = 50;

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="movieverse-pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="movieverse-page-btn"
      >
        Prev
      </button>
      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <span key={index} className="movieverse-dots">
            ...
          </span>
        ) : (
          <button
            key={index}
            className={`movieverse-page-btn ${
              page === currentPage ? "movieverse-active" : ""
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="movieverse-page-btn"
      >
        Next
      </button>
    </div>
  );
}

function MoviesPage() {
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    async function fetchAllMovies() {
      const all = [];
      const seenIds = new Set();

      for (let i = 1; i <= TOTAL_PAGES_TO_FETCH; i++) {
        const pageMovies = await getPopularMovies(i);

        const uniqueMovies = pageMovies.filter((movie) => {
          if (seenIds.has(movie.id)) {
            return false;
          }
          seenIds.add(movie.id);
          return true;
        });

        all.push(...uniqueMovies);
      }

      setAllMovies(all);
    }

    fetchAllMovies();
  }, []);

  useEffect(() => {
    let filtered = [...allMovies];

    if (searchTerm) {
      filtered = filtered.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedGenre) {
      filtered = filtered.filter((movie) =>
        movie.genre_ids.includes(Number(selectedGenre))
      );
    }

    if (selectedYear) {
      filtered = filtered.filter((movie) =>
        movie.release_date?.startsWith(selectedYear)
      );
    }

    setFilteredMovies(filtered);
    setCurrentPage(1);
  }, [allMovies, searchTerm, selectedGenre, selectedYear]);

  const indexOfLast = currentPage * MOVIES_PER_PAGE;
  const indexOfFirst = indexOfLast - MOVIES_PER_PAGE;
  const currentMovies = filteredMovies.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredMovies.length / MOVIES_PER_PAGE);

  const closeModal = () => setSelectedMovieId(null);

  return (
    <section className="movieverse-wrapper">
      <Filter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        genreMap={genreMap}
      />

      <h1 className="movieverse-title">Movies</h1>

      <div className="movieverse-grid">
        {currentMovies.length > 0 ? (
          currentMovies.map((movie) => (
            <div
              key={movie.id}
              className="movieverse-card"
              style={{
                backgroundImage: movie.poster_path
                  ? `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`
                  : "url('../../img/movie.png')",
                cursor: "pointer",
              }}
              onClick={() => setSelectedMovieId(movie.id)} 
            >
              <div className="movieverse__card-box">
                <h3 className="movieverse-movie-name">{movie.title}</h3>
                <span className="movieverse-genres">
                  {genreMap[movie.genre_ids[0]] || "Unknown"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="movieverse-no-movies">No movies found.</p>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {selectedMovieId && (
        <MovieModal movieId={selectedMovieId} onClose={closeModal} />
      )}
    </section>
  );
}

export default MoviesPage;
