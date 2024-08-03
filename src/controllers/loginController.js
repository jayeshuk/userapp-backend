const utilityFunctions = require("../utilities");
const connection = require("../../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.loginUser = (req, res) => {
  const { mobile, password } = req.body;

  if (!mobile || !password) {
    return res.status(400).json({ error: "Mobile number and password are required" });
  }

  const query = "SELECT * FROM registration WHERE mobile_number = ?";
  connection.query(query, [mobile], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database query failed" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid mobile number or password" });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Password comparison failed" });
      }

      if (!isMatch) {
        return res.status(401).json({ error: "Invalid mobile number or password" });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      const greetingMessage = utilityFunctions.getGreetingMessage(user.first_name, user.last_name);
      res.json({ message: greetingMessage, token });
    });
  });
};
