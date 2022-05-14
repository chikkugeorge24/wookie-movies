const Movies = require("../models/movies");
const { DEFAULT_LIMIT, DEFAULT_PAGE } = require("../utils/constants");
const { SuccessRes, ErrorRes } = require("../utils/response");
const logger = require("../utils/logger");

/**
 * Get all Movies
 * @param {*} req
 * @param {*} res
 * @returns {Array} movies
 */
const getMovies = async (req, res) => {
  const { page, limit } = req.query;
  try {
    const options = {
      page: page ? Number(page) : DEFAULT_PAGE,
      limit: limit ? Number(limit) : DEFAULT_LIMIT,
    };
    const movies = await Movies.paginate({}, options);
    res.status(200).send(SuccessRes("List of Movies", 200, movies));
    logger.info(
      `200 - List of Movies: ${movies}- ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  } catch (err) {
    res.status(400).send(ErrorRes(err.message, 400, err.message));
    logger.error(
      `400 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  }
};

/**
 * Get all Movies and Group by Genres
 * @param {*} req
 * @param {*} res
 * @returns {Array} movies
 */
const groupByGeneres = async (req, res) => {
  try {
    const movies = await Movies.aggregate([
      {
        $unwind: "$genres",
      },
      {
        $group: {
          _id: "$genres",
          genres: { $first: "$genres" },
          movies: {
            $push: {
              director: "$director",
              imdb_rating: "$imdb_rating",
              length: "$length",
              poster: "$poster",
              title: "$title",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]).exec();
    res
      .status(200)
      .send(SuccessRes("List of Movies grouped by generes", 200, movies));
    logger.info(
      `200 - List of Movies grouped by generes: ${movies}- ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  } catch (err) {
    res.status(400).send(ErrorRes(err.message, 400, err.message));
    logger.error(
      `400 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
  }
};

module.exports = { getMovies, groupByGeneres };
