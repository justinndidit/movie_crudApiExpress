const express = require("express");
const dbConnect = require("./config/dbConnection");
const dotenv = require("dotenv").config();

async function awaitConnection() {
  await dbConnect();
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
}

awaitConnection();
const app = express();
const router = require("./routes/movieRoutes");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/movies", router);
app.use(require("./middlewares/otherRoute"));
