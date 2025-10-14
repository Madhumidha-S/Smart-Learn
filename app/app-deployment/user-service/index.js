const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("swagger-jsdoc");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

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
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

app.use("/", routes);

const swaggerSpec = swaggerDocument(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT1 || 3000;
app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));
