const pool = require("../utils/database.js");

const getStudents = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      sortBy = "id",
      sortOrder = "asc",
    } = req.query;
    const offset = (page - 1) * limit;

    const searchQuery = `%${search}%`;

    const totalResult = await pool.query(
      "SELECT COUNT(*) FROM students WHERE name LIKE $1",
      [searchQuery]
    );
    const total = totalResult.rows[0].count;

    const dataResult = await pool.query(
      `SELECT * FROM students
       WHERE name ILIKE $1
       ORDER BY ${sortBy} ${sortOrder === "desc" ? "DESC" : "ASC"}
       LIMIT $2 OFFSET $3`,
      [searchQuery, limit, offset]
    );

    res.json({ data: dataResult.rows, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching students" });
  }
};

const addStudent = async (req, res) => {
  try {
    const { name, age, guardian_name, guardian_phone } = req.body;
    const result = await pool.query(
      "INSERT INTO students (name, age, guardian_name, guardian_phone) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, age, guardian_name, guardian_phone]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding student" });
  }
};
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, guardian_name, guardian_phone } = req.body;
    const result = await pool.query(
      "UPDATE students SET name=$1, age=$2, guardian_name=$3, guardian_phone=$4 WHERE id=$5 RETURNING *",
      [name, age, guardian_name, guardian_phone, id]
    );
    if (result.rowCount === 0)
      return res.status(404).json({ message: "Not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Error updating student" });
  }
};
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM students WHERE id=$1", [id]);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting student" });
  }
};

module.exports = {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
};
