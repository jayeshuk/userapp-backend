const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const mysql = require("mysql");
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
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/register", async (req, res) => {
  const { first_name, last_name, mobile_number, password, created_by } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  connection.query(
    "CALL InsertRegistration(?, ?, ?, ?, ?)",
    [first_name, last_name, mobile_number, hashedPassword, created_by],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
      res.status(201).json({ message: "User registered successfully." });
    }
  );
});

app.get("/register/:id", (req, res) => {
  const { id } = req.params;

  connection.query("CALL SelectRegistration(?)", [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.status(200).json(results[0]);
  });
});

app.put("/register/:id", async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, mobile_number, password, updated_by } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  connection.query(
    "CALL UpdateRegistration(?, ?, ?, ?, ?, ?)",
    [id, first_name, last_name, mobile_number, hashedPassword, updated_by],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
      res.status(200).json({ message: "User updated successfully." });
    }
  );
});

app.delete("/register/:id", (req, res) => {
  const { id } = req.params;

  connection.query("CALL DeleteRegistration(?)", [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.status(200).json({ message: "User deleted successfully." });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
