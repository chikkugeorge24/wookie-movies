const express = require("express");

const controller = require("../controllers/movies");
const auth = require("../middleware/auth");

const moviesRouter = express.Router();

/**Path /movies */
moviesRouter.route("/").get(auth(), controller.getMovies);
moviesRouter.route("/group").get(auth(), controller.groupByGeneres);

module.exports = moviesRouter;
