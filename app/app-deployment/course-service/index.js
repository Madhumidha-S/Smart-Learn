const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const logger = require("./utils/logger");
const analyticsRouter = require("./controllers/analytics");
const teachersRouter = require("./controllers/teachers");
const router = require("./routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("swagger-jsdoc");
const studentRouter = require("./routes/studentRouter.js");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/analytics", analyticsRouter);
app.use("/teachers", teachersRouter);

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/", router);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Smart Learning Platform Course Service API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Madhumidha S",
        url: "https://www.linkedin.com/in/madhumidha-s-0579bb214/",
        email: "madhumidha072005@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3001/",
      },
    ],
  },
  apis: ["./routes/*.js"], // point to your route files with JSDoc comments
};

const swaggerSpec = swaggerDocument(options);

app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ message: "Server error" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT2 || 3001;
app.listen(PORT, () => console.log(`Course Service running on port ${PORT}`));
