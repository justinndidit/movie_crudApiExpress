const express = require("express");
const dbConnect = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const errorHandlerClass = require("./util/errorClass");

async function awaitConnection() {
  await dbConnect();
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
}

awaitConnection();
const app = express();
const router = require("./routes/movieRoutes");
const errorHandler = require("./middlewares/errorHandler");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/movies", router);
app.use("*", (req, res, next) => {
  next(errorHandlerClass.globalErrorHandler(404, "Route not found"));
});

app.use(errorHandler);
