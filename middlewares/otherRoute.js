module.exports = (req, res, next) => {
  res.statusCode = 404;
  throw new Error("Route Not Found");
  next();
};
