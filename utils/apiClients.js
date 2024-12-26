const axios = require("axios");

const TMDB_API_KEY = process.env.TMDB_API_KEY;

// Create an Axios instance for TMDB
const tmdbClient = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjkxYTExMzIxN2MxMTdmZWQ0NDgwMjgxMGExYjk4OSIsIm5iZiI6MTY5NjYyMTIwNy45Njg5OTk5LCJzdWIiOiI2NTIwNjI5NzViMTI0MDAwYzYwNjE2OGIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6nfN6yZ2FW8HJoHkvqqarlCYNJA0Ir8Ewia41E5eLG0",
    },
  });

module.exports = tmdbClient;
