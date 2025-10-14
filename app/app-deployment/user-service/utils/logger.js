const winston = require("winston");
const config = require("../config");

const logger = winston.createLogger({
  level: config.env === "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: {
    service: "user-service",
    app: "Smart Learning Platform",
    environment: config.env,
  },
});

if (config.env !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}
module.exports = logger;
