const pool = require("../utils/database");

const Assignment = {
  async create({ course_id, title, due_date }) {
    const result = await pool.query(
      `INSERT INTO assignments (course_id, title, due_date)
       VALUES ($1,$2,$3) RETURNING *`,
      [course_id, title, due_date]
    );
    return result.rows[0];
  },

  async getByCourse(course_id) {
    const result = await pool.query(
      "SELECT * FROM assignments WHERE course_id=$1",
      [course_id]
    );
    return result.rows;
  },
};

module.exports = Assignment;
