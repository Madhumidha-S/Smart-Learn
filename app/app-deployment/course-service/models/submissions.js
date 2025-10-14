const pool = require("../utils/database");

const Submission = {
  async submit({ assignment_id, student_id, status }) {
    const result = await pool.query(
      `INSERT INTO submissions (assignment_id, student_id, status)
       VALUES ($1,$2,$3) RETURNING *`,
      [assignment_id, student_id, status]
    );
    return result.rows[0];
  },

  async getByAssignment(assignment_id) {
    const result = await pool.query(
      "SELECT * FROM submissions WHERE assignment_id=$1",
      [assignment_id]
    );
    return result.rows;
  },
};

module.exports = Submission;
