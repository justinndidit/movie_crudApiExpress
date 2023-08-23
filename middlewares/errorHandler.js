const errorHandler = (err, req, res, next) => {
  err.code = err.code || 500;
  err.message = err.message || "Something went wrong";
  const status = "Failed";

  res.status(err.code).json({
    status: status,
    message: err.message,
  });
};

module.exports = errorHandler;
