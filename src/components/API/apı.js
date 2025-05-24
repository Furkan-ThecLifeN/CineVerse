export const API_KEY = "9ebf9e837d9ef4fed6be03cdee0216b5";
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZWJmOWU4MzdkOWVmNGZlZDZiZTAzY2RlZTAyMTZiNSIsIm5iZiI6MTc0MjkxNzcyNC4zOTYsInN1YiI6IjY3ZTJkMDVjZDcwYzYxNTkwMzc1ZTgzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mGfFevHBMVfVG3Aha3atAbsBAX0sx3BUJdHGcEDZwAk";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const headers = {
  Authorization: `Bearer ${ACCESS_TOKEN}`,
  "Content-Type": "application/json;charset=utf-8",
};

// Film türleri haritası (ID => Tür ismi)
export const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

// Popüler filmleri getir
export async function getPopularMovies(page = 1) {
  const response = await fetch(
    `${BASE_URL}/movie/popular?language=en-US&page=${page}`,
    {
      headers,
    }
  );
  const data = await response.json();
  return data.results;
}

// Film detayını getir
export async function getMovieDetails(movieId) {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?language=en-US`, {
    headers,
  });
  const data = await response.json();
  return data;
}

// Arama
export async function searchMovies(query, page = 1) {
  const response = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(
      query
    )}&language=en-US&page=${page}`,
    {
      headers,
    }
  );
  const data = await response.json();
  return data.results;
}

// Türlere göre film getir
export async function getMoviesByGenre(genreId, page = 1) {
  const response = await fetch(
    `${BASE_URL}/discover/movie?with_genres=${genreId}&language=en-US&page=${page}`,
    {
      headers,
    }
  );
  const data = await response.json();
  return data.results;
}

// Resim linkini oluştur
export const getImageUrl = (path) =>
  path ? `https://image.tmdb.org/t/p/original${path}` : "";
