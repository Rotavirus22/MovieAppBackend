require("express-async-errors");
const http = require("http");
const mongoose = require("mongoose");

const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const errorHandlers = require("./handlers/errorHandlers");
const userRoute = require("./modules/users/user.routes");
const movieRouter = require("./modules/movie/movie.routes");

require("dotenv").config();

const app = express();
app.use(cors());

mongoose
  .connect(process.env.mongo_connection, {})
  .then(() => {
    console.log("Mongo Connection Successful!");
  })
  .catch(() => {
    console.log("Mongo Connection failed");
  });

  require("./models/user.model");

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use(express.json());


app.use("/api/users", userRoute);
app.use("/api/movie",movieRouter);

app.all("*", (req, res, next) => {
    res.status(400).json({
      status: "failed",
      message: "Not found !!",
    });
  });

app.use(errorHandlers);
  server.listen(8000, () => {
    console.log(`Server started successfully`);
  });



