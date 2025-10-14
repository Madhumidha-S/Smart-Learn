const express = require("express");
const {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/StudentController.js");
const { authMiddleware, isTeacher } = require("../middleware/authMiddleware");

const router = express.Router();
router.use(authMiddleware, isTeacher);

router.get("/", getStudents);
router.post("/", addStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
