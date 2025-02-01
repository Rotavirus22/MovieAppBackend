const tmdbClient = require("../../../utils/apiClients");

// Helper function to construct the embed URL for movies
const constructEmbedUrl = (imdbId) => `https://vidsrc.icu/embed/movie/${imdbId}`;

// Fetch Popular Movies with Embedded Links
const getPopularMovies = async (req, res) => {
  try {
    const response = await tmdbClient.get("movie/popular", {
      params: { page: req.query.page || 1 },
    });

    // Fetch IMDb IDs and add embed URLs to movies
    const moviesWithEmbed = await Promise.all(
      response.data.results.map(async (movie) => {
        try {
          const movieDetails = await tmdbClient.get(`movie/${movie.id}`, {
            params: { append_to_response: "external_ids" },
          });
          const imdbId = movieDetails.data.imdb_id;
          return {
            ...movie,
            embedUrl: imdbId ? constructEmbedUrl(imdbId) : null,
          };
        } catch (error) {
          return { ...movie, embedUrl: null };
        }
      })
    );

    res.json({ ...response.data, results: moviesWithEmbed });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch popular movies", details: error.message });
  }
};

// Repeat for Upcoming Movies
const getUpcomingMovies = async (req, res) => {
  try {
    const response = await tmdbClient.get("movie/upcoming", {
      params: { page: req.query.page || 1 },
    });

    const moviesWithEmbed = await Promise.all(
      response.data.results.map(async (movie) => {
        try {
          const movieDetails = await tmdbClient.get(`movie/${movie.id}`, {
            params: { append_to_response: "external_ids" },
          });
          const imdbId = movieDetails.data.imdb_id;
          return {
            ...movie,
            embedUrl: imdbId ? constructEmbedUrl(imdbId) : null,
          };
        } catch (error) {
          return { ...movie, embedUrl: null };
        }
      })
    );

    res.json({ ...response.data, results: moviesWithEmbed });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch upcoming movies", details: error.message });
  }
};

// Fetch Now Playing Movies with Embed Links
const getNowPlayingMovies = async (req, res) => {
  try {
    const response = await tmdbClient.get("movie/now_playing", {
      params: { page: req.query.page || 1 },
    });

    const moviesWithEmbed = await Promise.all(
      response.data.results.map(async (movie) => {
        try {
          const movieDetails = await tmdbClient.get(`movie/${movie.id}`, {
            params: { append_to_response: "external_ids" },
          });
          const imdbId = movieDetails.data.imdb_id;
          return {
            ...movie,
            embedUrl: imdbId ? constructEmbedUrl(imdbId) : null,
          };
        } catch (error) {
          return { ...movie, embedUrl: null };
        }
      })
    );

    res.json({ ...response.data, results: moviesWithEmbed });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch now playing movies", details: error.message });
  }
};

// Fetch Movies by Genre with Embed Links
const getMoviesByGenre = async (req, res) => {
  const { genreId } = req.params;
  try {
    const response = await tmdbClient.get("discover/movie", {
      params: {
        with_genres: genreId,
        page: req.query.page || 1,
      },
    });

    const moviesWithEmbed = await Promise.all(
      response.data.results.map(async (movie) => {
        try {
          const movieDetails = await tmdbClient.get(`movie/${movie.id}`, {
            params: { append_to_response: "external_ids" },
          });
          const imdbId = movieDetails.data.imdb_id;
          return {
            ...movie,
            embedUrl: imdbId ? constructEmbedUrl(imdbId) : null,
          };
        } catch (error) {
          return { ...movie, embedUrl: null };
        }
      })
    );

    res.json({ ...response.data, results: moviesWithEmbed });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies by genre", details: error.message });
  }
};


const searchMovies = async (req, res) => {
  const { query } = req.query; 
  if (!query) {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    const response = await tmdbClient.get("search/movie", {
      params: {
        query: query,
        page: req.query.page || 1,
      },
    });
    const moviesWithEmbed = await Promise.all(
      response.data.results.map(async (movie) => {
        try {
          const movieDetails = await tmdbClient.get(`movie/${movie.id}`, {
            params: { append_to_response: "external_ids" },
          });
          const imdbId = movieDetails.data.imdb_id;
          return {
            ...movie,
            embedUrl: imdbId ? constructEmbedUrl(imdbId) : null,
          };
        } catch (error) {
          return { ...movie, embedUrl: null };
        }
      })
    );

    res.json({ ...response.data, results: moviesWithEmbed });
  } catch (error) {
    res.status(500).json({ error: "Failed to search movies", details: error.message });
  }
};

const getSingleMovies = async (req, res) => {
  const { movieId } = req.params;

  if (!movieId) {
    return res.status(400).json({ error: "Movie ID is required" });
  }

  try {
    const response = await tmdbClient.get(`movie/${movieId}`, {
      params: { append_to_response: "external_ids" }, 
    });

    const imdbId = response.data.external_ids?.imdb_id;
    const movieWithEmbed = {
      ...response.data,
      embedUrl: imdbId ? constructEmbedUrl(imdbId) : null,
    };

    res.json(movieWithEmbed);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie details", details: error.message });
  }
};


module.exports = {
  getPopularMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  getMoviesByGenre,
  searchMovies,
  getSingleMovies
};
