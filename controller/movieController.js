const Movie = require("../model/movieModel");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

//@desc get all movies
//@method GET /apis/movies
//@access public

const getAllMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find({});

  if (movies.length < 1) {
    return res.json({ Message: "No movie has been added" });
  }

  res.json(movies);
});

//@desc add a movie
//@method POST /apis/movies
//@access public

const addMovie = asyncHandler(async (req, res) => {
  try {
    const { title, genre, year, rating } = req.body;

    if (!title || !genre || !year || !rating) {
      //update error messages
      res.status(400);
      throw new Error("Please Provide all fields");
    }

    const movie = await Movie.create({ title, genre, year, rating });
    console.log(movie);
    res.status(200).json(movie);
  } catch (err) {
    return res.json({ error: err.message });
  }
});

//@desc get movie
//@method GET /apis/movies/:id
//@access public

const getMovie = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ title: "Validation Error", message: "Invalid movie ID" });
    }
    const movie = await Movie.findById(id);

    if (!movie) {
      res.status(404);
      throw new Error("Movie not found");
    }
    res.json(movie);
  } catch (err) {
    return res.json({ error: err.message });
  }
});

//@desc update movie
//@method PUT /apis/movies/:id
//@access public

const updateMovie = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ title: "Validation Error", message: "Invalid movie ID" });
    }
    const movie = await Movie.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!movie) {
      res.status(404);
      throw new Error("Movie not found");
    }
    res.json(movie);
  } catch (err) {
    return res.json({ error: err.message });
  }
});

//@desc delete movie
//@method DELETE /apis/movies/:id
//@access public

const deleteMovie = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ title: "Validation Error", message: "Invalid movie ID" });
    }
    const movie = await Movie.findOneAndDelete({ _id: id });

    if (!movie) {
      res.status(404);
      throw new Error("Movie not found");
    }
    res.json(movie);
  } catch (err) {
    return res.json({ error: err.message });
  }
});

module.exports = {
  getAllMovies,
  addMovie,
  getMovie,
  deleteMovie,
  updateMovie,
};
