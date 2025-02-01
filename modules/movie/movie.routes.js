const express = require("express");
const { getMoviesByGenre, getNowPlayingMovies, getUpcomingMovies, getPopularMovies, searchMovies, getSingleMovies } = require("./controllers/movie");

const movieRouter = express.Router();

movieRouter.get("/movies/popular", getPopularMovies);
movieRouter.get("/movies/upcoming", getUpcomingMovies);
movieRouter.get("/movies/now-playing", getNowPlayingMovies);
movieRouter.get("/movies/genres/:genreId", getMoviesByGenre);
movieRouter.get("/movies/:movieId",getSingleMovies);


movieRouter.get("/search", searchMovies);

module.exports = movieRouter;