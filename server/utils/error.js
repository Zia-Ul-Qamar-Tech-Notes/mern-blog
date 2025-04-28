const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  console.log(`Error: ${error}`);
  return {
    status: statusCode,
    message: message,
  };
};

export { errorHandler };
