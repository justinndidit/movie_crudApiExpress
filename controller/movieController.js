const Movie = require("../model/movieModel");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const errorHandler = require("../util/errorClass");
//@desc get all movies
//@method GET /apis/movies
//@access public

const getAllMovies = asyncHandler(async (req, res, next) => {
  const movies = await Movie.find({});

  if (movies.length < 1) {
    next(errorHandler.globalErrorHandler(404, "No movies have been added yet"));
  }

  res.json(movies);
});

//@desc add a movie
//@method POST /apis/movies
//@access public

const addMovie = asyncHandler(async (req, res, next) => {
  const { title, genre, year, rating } = req.body;

  if (!title || !genre || !year || !rating) {
    next(
      errorHandler.globalErrorHandler(400, "Could Not validate some inputs")
    );
    return;
  }

  const movieExists = Movie.find({ title, year, genre });

  if (movieExists) {
    next(errorHandler.globalErrorHandler(400, "Movie already exists"));
    return;
  }

  const movie = await Movie.create({ title, genre, year, rating });
  res.status(201).json(movie);
});

//@desc get movie
//@method GET /apis/movies/:id
//@access public

const getMovie = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    next(errorHandler.globalErrorHandler(400, "Invalid Movie Id"));
    return;
  }
  const movie = await Movie.findById(id);

  if (!movie) {
    next(errorHandler.globalErrorHandler(404, "Movie not found"));
    return;
  }
  res.json(movie);
});

//@desc update movie
//@method PUT /apis/movies/:id
//@access public

const updateMovie = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    next(errorHandler.globalErrorHandler(400, "Invalid Movie Id"));
    return;
  }
  const movie = await Movie.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!movie) {
    next(errorHandler.globalErrorHandler(404, "Movie not found"));
    return;
  }
  res.json(movie);
});

//@desc delete movie
//@method DELETE /apis/movies/:id
//@access public

const deleteMovie = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    next(errorHandler.globalErrorHandler(400, "Invalid movie ID"));
    return;
  }
  const movie = await Movie.findOneAndDelete({ _id: id });

  if (!movie) {
    next(errorHandler.globalErrorHandler(404, "Movie not found"));
    return;
  }
  res.status(204).json({ message: `Movie ${id} was deleted successfully` });
});

module.exports = {
  getAllMovies,
  addMovie,
  getMovie,
  deleteMovie,
  updateMovie,
};
