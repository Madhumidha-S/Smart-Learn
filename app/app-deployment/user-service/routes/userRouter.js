const express = require("express");
const { signup, login, logout } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "This is your profile", user: req.user });
});

router.get("/admin", authMiddleware, roleMiddleware([1]), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});
router.get("/teacher", authMiddleware, roleMiddleware([2]), (req, res) => {
  res.json({ message: "Welcome Teacher!" });
});
router.get("/student", authMiddleware, roleMiddleware([3]), (req, res) => {
  res.json({ message: "Welcome Student!" });
});

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, teacher, student]
 *     responses:
 *       201:
 *         description: User registered
 *       400:
 *         description: Invalid role or already exists
 *
 * /login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *
 * /logout:
 *   post:
 *     summary: Logout user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Logged out
 *
 * /profile:
 *   get:
 *     summary: Get user profile (from JWT)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User profile
 * /{roles}:
 *  get:
 *     summary: Get all users by role
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         schema:
 *           type: string
 *           enum: [admin, teacher, student]
 *         description: Role of users
 *     responses:
 *       200:
 *         description: List of users with the given role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 5
 *                       username:
 *                         type: string
 *                         example: arjun
 *                       email:
 *                         type: string
 *                         example: arjun@mail.com
 *                       role_id:
 *                         type: integer
 *                         example: 1
 *       400:
 *         description: Invalid role
 *       500:
 *         description: Failed to fetch users
 */
