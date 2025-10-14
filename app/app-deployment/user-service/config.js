const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

module.exports = {
  server: {
    port: process.env.PORT1 || 3000,
    env: process.env.NODE_ENV || "development",
  },
  database: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || "smart_learning_db",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  },
  cookie: {
    secret: process.env.COOKIE_SECRET,
    secure: process.env.COOKIE_SECURE === "true",
  },
  logging: {
    file: process.env.LOG_FILE || "logs/app.log",
  },
};
