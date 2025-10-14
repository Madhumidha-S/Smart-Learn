const express = require("express");
const router = express.Router();
const pool = require("../utils/database.js");
const cors = require("cors");



router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email FROM users WHERE role_id = 2"
    );
    res.json({ teachers: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch teachers" });
  }
});

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, password, role_id) VALUES ($1, $2, $3, 2) RETURNING id, name, email",
      [name, email, password]
    );
    res.json({ teacher: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add teacher" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const result = await pool.query(
      "UPDATE users SET name=$1, email=$2, password=$3 WHERE id=$4 AND role_id=2 RETURNING id, name, email",
      [name, email, password, id]
    );
    res.json({ teacher: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update teacher" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM users WHERE id=$1 AND role_id=2", [id]);
    res.json({ message: "Teacher deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete teacher" });
  }
});

module.exports = router;
