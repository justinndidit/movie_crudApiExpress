const express = require("express");
const {
  getAllMovies,
  addMovie,
  getMovie,
  deleteMovie,
  updateMovie,
} = require("../controller/movieController");
const router = express.Router();

router.route("/").get(getAllMovies).post(addMovie);
router.route("/:id").get(getMovie);
router.route("/:id").delete(deleteMovie).put(updateMovie);
module.exports = router;
