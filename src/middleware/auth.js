const { ErrorRes } = require("../utils/response");
const logger = require("../utils/logger");

const { JWT_TOKEN } = process.env;

module.exports = () => {
  return (req, res, next) => {
    try {
      const bearerToken = req.header("Authorization");
      if (!bearerToken.startsWith("Bearer")) {
        logger.error(
          `401 - Access denied. - ${req.originalUrl} - ${req.method} - ${req.ip}`
        );
        return res
          .status(401)
          .send(ErrorRes("Access denied.", 401, "Access denied"));
      }
      const token = bearerToken.split(" ")[1];
      if (token !== JWT_TOKEN) {
        logger.error(
          `401 - Invalid token - ${req.originalUrl} - ${req.method} - ${req.ip}`
        );
        return res
          .status(401)
          .send(ErrorRes("Invalid token.", 401, "Invalid token"));
      }
      next();
    } catch (error) {
      res.status(401).send(ErrorRes("Invalid token.", 401, "Invalid token"));
      logger.error(
        `401 - Invalid token. - ${req.originalUrl} - ${req.method} - ${req.ip}`
      );
    }
  };
};
