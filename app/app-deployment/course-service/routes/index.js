const express = require("express");
const courseRouter = require("./courseRouter");
const student = require("./studentRouter");
const router = express.Router();
router.use("/course", courseRouter);
router.use("/student", student);
module.exports = router;
