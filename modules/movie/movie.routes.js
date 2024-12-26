const express = require("express");
const { getMoviesByGenre, getNowPlayingMovies, getUpcomingMovies, getPopularMovies } = require("./controllers/movie");

const movieRouter = express.Router();

movieRouter.get("/movies/popular", getPopularMovies);
movieRouter.get("/movies/upcoming", getUpcomingMovies);
movieRouter.get("/movies/now-playing", getNowPlayingMovies);
movieRouter.get("/movies/genres/:genreId", getMoviesByGenre);

module.exports = movieRouter;