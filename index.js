require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const MovieRoutes = require("./src/routes/movies");
const { ErrorRes } = require("./src/utils/response");
const swaggerDocs = require("./src/utils/swagger");
const logger = require("./src/utils/logger");

const { DB_USER, DB_PASSWORD, DATABASE, PORT } = process.env;
const port = PORT || 8000;
const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@sandbox.cfa52.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;

mongoose
  .connect(url)
  .then(() => {
    logger.info(`200 - MongoDB connected - Success`);
  })
  .catch((err) => {
    logger.error(`400 - MongoDB is not connected: ${err} - Failed`);
  });

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PATCH,DELETE",
    credentials: true,
  })
);

app.use("/movies", MovieRoutes);

app.get("/", async (req, res) => {
  res.status(200).send("Wookie Movie App is up and running!");
  logger.info(
    `Wookie Movie App is up and running! - 200 - Success - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );
});

app.listen(port, () => {
  logger.info(
    `Wookie Movie App Server started on port: ${port} - 200 - Success`
  );
  swaggerDocs(app, port);
});
