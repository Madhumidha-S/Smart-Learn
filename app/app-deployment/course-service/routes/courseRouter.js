const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const { authMiddleware } = require("../middleware/authMiddleware");
const roleCheck = require("../middleware/roleMiddleware");
const recommendationsLimiter = require("../middleware/rateLimit");

const STUDENT = 3,
  TEACHER = 2,
  ADMIN = 1;

const combinedRoles = [TEACHER, ADMIN];

router.get("/", authMiddleware, courseController.getCourses);
router.post("/", authMiddleware, roleCheck(combinedRoles), courseController.createCourse);
router.post("/enroll", authMiddleware, roleCheck([STUDENT]), courseController.enroll);
router.post(
  "/assignment",
  authMiddleware,
  roleCheck(combinedRoles),
  courseController.createAssignment
);
router.post(
  "/submit",
  authMiddleware,
  roleCheck([STUDENT]),
  courseController.submitAssignment
);
router.get("/assignments", authMiddleware, courseController.getAssignments);
router.get(
  "/submissions/:assignment_id",
  authMiddleware,
  roleCheck(combinedRoles),
  courseController.getSubmissions
);

router.get(
  "/recommendations",
  authMiddleware,
  recommendationsLimiter,
  courseController.getRecommendations
);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Course management
 */

/**
 * @swagger
 * /course:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of courses
 *
 *   post:
 *     summary: Create a new course (teacher/admin only)
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Course created
 *
 * /course/enroll:
 *   post:
 *     summary: Enroll in a course (student only)
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Enrolled successfully
 */

/**
 * @swagger
 * tags:
 *   name: Assignments
 *   description: Assignment management
 */

/**
 * @swagger
 * /course/assignment:
 *   post:
 *     summary: Create an assignment (teacher/admin only)
 *     tags: [Assignments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course_id:
 *                 type: integer
 *               title:
 *                 type: string
 *               due_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Assignment created
 *
 * /course/assignments:
 *   post:
 *     summary: Get all assignments for a course
 *     tags: [Assignments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: List of assignments for the course
 *
 * /course/submit:
 *   post:
 *     summary: Submit an assignment (student only)
 *     tags: [Assignments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               assignment_id:
 *                 type: integer
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Assignment submitted
 *
 * /course/submissions/{assignment_id}:
 *   get:
 *     summary: Get submissions for assignment (teacher/admin only)
 *     tags: [Assignments]
 *     parameters:
 *       - in: path
 *         name: assignment_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Assignment ID
 *     responses:
 *       200:
 *         description: List of submissions
 *
 * /course/recommendations:
 *   get:
 *     summary: Get recommended courses (top-rated)
 *     description: Returns a list of top-rated courses. Limited to 10 requests per minute per user.
 *     tags: [Courses]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of recommended courses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 recommendations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       category:
 *                         type: string
 *                       rating:
 *                         type: number
 *                         format: float
 *                       instructor_id:
 *                         type: integer
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *       429:
 *         description: Too many requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Too many requests, please try again later."
 */
