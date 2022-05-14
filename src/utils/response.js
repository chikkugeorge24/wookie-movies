module.exports.SuccessRes = (message, status, data) => {
  return {
    message: message ? message : "Success",
    status: status ? status : 200,
    data,
  };
};

module.exports.ErrorRes = (message, status = 400, error) => {
  return {
    message: message ? message : "Something went wrong!",
    status: status ? status : 400,
    error,
  };
};
