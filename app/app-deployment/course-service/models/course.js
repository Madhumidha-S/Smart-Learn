const pool = require("../utils/database");

const Course = {
  async getAll({ page = 1, limit = 5, category, sort }) {
    let query = "SELECT * FROM courses";
    const params = [];
    const conditions = [];
    if (category) {
      conditions.push(`category=$${params.length + 1}`);
      params.push(category);
    }
    if (conditions.length) query += " WHERE " + conditions.join(" AND ");

    if (sort === "rating_desc") query += " ORDER BY rating DESC";
    else if (sort === "rating_asc") query += " ORDER BY rating ASC";

    query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, (page - 1) * limit);

    const result = await pool.query(query, params);
    return result.rows;
  },

  async create({ title, description, category, instructor_id }) {
    const result = await pool.query(
      `INSERT INTO courses (title, description, category, instructor_id) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [title, description, category, instructor_id]
    );
    return result.rows[0];
  },

  async findById(id) {
    const result = await pool.query("SELECT * FROM courses WHERE id=$1", [id]);
    return result.rows[0];
  },

  async getRecommendations(limit = 5) {
    const { rows } = await pool.query(
      "SELECT * FROM courses ORDER BY rating DESC LIMIT $1",
      [limit]
    );
    return rows;
  },
};

module.exports = Course;
