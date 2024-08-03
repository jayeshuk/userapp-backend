const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mysql = require("mysql");
const testRouter = require("./src/routes/testRoutes")
const registrationRouter = require("./src/routes/registrationRoutes")
const loginRouter = require("./src/routes/loginRoutes");
// const connection = require("./db"); // Connect to DATABSE using external db.js

// Load environment variables
dotenv.config();

// Create the express app
const app = express();

// Middleware
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to database.");
});

// Define routes
app.use("/api/v1/test", testRouter);
app.use("/api/v1/register", registrationRouter)
app.use("/api/v1/login", loginRouter)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
