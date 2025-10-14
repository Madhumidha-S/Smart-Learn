const pool = require("../utils/database");

const Enrollment = {
  async enroll({ student_id, course_id }) {
    const result = await pool.query(
      `INSERT INTO enrollments (student_id, course_id) VALUES ($1,$2) RETURNING *`,
      [student_id, course_id]
    );
    return result.rows[0];
  },

  async getStudentCourses(student_id) {
    const result = await pool.query(
      `SELECT c.* FROM courses c
       JOIN enrollments e ON c.id = e.course_id
       WHERE e.student_id=$1`,
      [student_id]
    );
    return result.rows;
  },
};

module.exports = Enrollment;
