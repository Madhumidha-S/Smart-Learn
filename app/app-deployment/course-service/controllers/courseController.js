const Course = require("../models/course");
const Enrollment = require("../models/enrollments");
const Assignment = require("../models/assignments");
const Submission = require("../models/submissions");
const axios = require("axios");

exports.getCourses = async (req, res, next) => {
  try {
    const { page, limit, category, sort } = req.query;
    let courses = await Course.getAll({ page, limit, category, sort });

    courses = await Promise.all(
      courses.map(async (c) => {
        try {
          const userResp = await axios.get(
            `http://localhost:3000/users/${c.instructor_id}`
          );
          c.instructor = userResp.data;
        } catch {
          c.instructor = null;
        }
        return c;
      })
    );

    res.json({ courses });
  } catch (err) {
    next(err);
  }
};

exports.createCourse = async (req, res, next) => {
  try {
    const { title, description, category } = req.body;
    const instructor_id = req.user.id;
    const course = await Course.create({
      title,
      description,
      category,
      instructor_id,
    });
    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
};

exports.enroll = async (req, res, next) => {
  try {
    const student_id = req.user.id;
    const { course_id } = req.body;
    const enrollment = await Enrollment.enroll({ student_id, course_id });
    res.status(201).json(enrollment);
  } catch (err) {
    next(err);
  }
};

exports.createAssignment = async (req, res, next) => {
  try {
    const { course_id, title, due_date } = req.body;
    const assignment = await Assignment.create({ course_id, title, due_date });
    res.status(201).json({ message: "Assignment created", assignment });
  } catch (err) {
    next(err);
  }
};

exports.getAssignments = async (req, res, next) => {
  try {
    const { course_id } = req.body;
    const assignments = await Assignment.getByCourse(course_id);
    res.json({ assignments });
  } catch (err) {
    next(err);
  }
};

exports.submitAssignment = async (req, res, next) => {
  try {
    const { assignment_id, content } = req.body;
    const student_id = req.user.id;
    const submission = await Submission.submit({
      assignment_id,
      student_id,
      content,
    });
    res.status(201).json({ message: "Assignment submitted", submission });
  } catch (err) {
    next(err);
  }
};

exports.getSubmissions = async (req, res, next) => {
  try {
    const { assignment_id } = req.params;
    const submissions = await Submission.getByAssignment(assignment_id);
    res.json({ submissions });
  } catch (err) {
    next(err);
  }
};

exports.getRecommendations = async (req, res, next) => {
  try {
    const courses = await Course.getRecommendations(5);
    res.json({ recommendations: courses });
  } catch (err) {
    next(err);
  }
};