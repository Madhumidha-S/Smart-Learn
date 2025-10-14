const pool = require("../utils/database");

const Role = {
  async findById(id) {
    const result = await pool.query("SELECT * FROM roles WHERE id = $1", [id]);
    return result.rows[0];
  },
  async findByName(name) {
    const result = await pool.query("SELECT * FROM roles WHERE name = $1", [
      name,
    ]);
    return result.rows[0];
  },
};

module.exports = Role;
