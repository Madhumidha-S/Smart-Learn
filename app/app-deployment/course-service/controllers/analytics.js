const express = require("express");
const router = express.Router();
const pool = require("../utils/database.js");
const cors = require("cors");

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const ageStats = await pool.query(`
      SELECT age, COUNT(*) AS count
      FROM students
      GROUP BY age
      ORDER BY age
    `);

    const teacherStats = await pool.query(`
      SELECT u.id, u.name, COUNT(e.id) AS total_students
      FROM users u
      LEFT JOIN courses c ON c.instructor_id = u.id
      LEFT JOIN enrollments e ON e.course_id = c.id
      WHERE u.role_id = 2
      GROUP BY u.id
      ORDER BY u.name
    `);

    const totalStudentsRes = await pool.query(`SELECT COUNT(*) FROM students`);
    const totalTeachersRes = await pool.query(
      `SELECT COUNT(*) FROM users WHERE role_id=2`
    );
    const totalCoursesRes = await pool.query(`SELECT COUNT(*) FROM courses`);

    res.json({
      ageStats: ageStats.rows,
      teacherStats: teacherStats.rows,
      summary: {
        totalStudents: parseInt(totalStudentsRes.rows[0].count),
        totalTeachers: parseInt(totalTeachersRes.rows[0].count),
        totalCourses: parseInt(totalCoursesRes.rows[0].count),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

module.exports = router;
