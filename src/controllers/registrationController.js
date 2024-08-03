const bcrypt = require("bcrypt");
const connection = require("../../db");

exports.registerUser = async (req, res) => {
  const { first_name, last_name, mobile_number, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  connection.query(
    "CALL InsertRegistration(?, ?, ?, ?)",
    [first_name, last_name, mobile_number, hashedPassword],
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error });
      }
      res.status(201).json({ data: { message: "User registered successfully." } });
    }
  );
};

exports.getUser = (req, res) => {
  const { id } = req.params;

  connection.query("CALL SelectRegistration(?)", [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.status(200).json(results[0]);
  });
};

exports.updateUser = async (req, res) => {
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
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;

  connection.query("CALL DeleteRegistration(?)", [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.status(200).json({ message: "User deleted successfully." });
  });
};
