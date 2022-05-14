const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const MoviesSchema = new mongoose.Schema(
  {
    backdrop: { type: String },
    cast: { type: [String] },
    classification: { type: String },
    director: { type: String },
    genres: { type: [String] },
    id: { type: String, required: true, unique: true },
    imdb_rating: { type: Number },
    length: { type: String },
    overview: { type: String },
    poster: { type: String },
    released_on: { type: Date },
    slug: { type: String },
    title: { type: String },
  },
  { collection: "movies" }
);

MoviesSchema.plugin(mongoosePaginate);
const model = mongoose.model("MoviesModel", MoviesSchema);

module.exports = model;
