const { Pool } = require("pg");
const config = require("../config");

const pool = new Pool({
  host: config.database.host,
  port: config.database.port,
  user: config.database.user,
  password: config.database.password,
  database: config.database.name,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.log("Database connection error:", err.stack);
  } else {
    console.log("Database connected successfully");
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
