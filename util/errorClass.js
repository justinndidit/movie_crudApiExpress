class errorHandlerClass {
  constructor(code, message) {
    this.code = code; //reps statusCode
    this.message = message; //reps error message
  }
  static globalErrorHandler(code, message) {
    return new errorHandlerClass(code, message);
  }
}

module.exports = errorHandlerClass;
