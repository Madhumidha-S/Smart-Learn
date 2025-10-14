const pool = require("../utils/database");

const User = {
  async findByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  },
  async findById(id) {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  },
  async createUser({ name, email, password, role_id }) {
    const result = await pool.query(
      "INSERT INTO users (name, email, password, role_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, password, role_id]
    );
    return result.rows[0];
  },
};

module.exports = User;
