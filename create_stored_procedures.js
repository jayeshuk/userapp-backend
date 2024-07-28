const fs = require("fs");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "equip9-user",
  password: "equip9@123",
  database: "registration_db",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database.");

  const sql = fs.readFileSync("stored_procedures.sql", "utf8");
  const procedures = sql
    .split("//")
    .map((proc) => proc.trim())
    .filter((proc) => proc.length > 0);

  let errorOccurred = false;

  const executeProcedure = (proc, callback) => {
    connection.query(proc, (err, results) => {
      if (err) {
        console.error("Error executing SQL procedure:", err);
        errorOccurred = true;
        callback(err);
        return;
      }
      console.log("Stored procedure executed successfully.");
      callback();
    });
  };

  const executeAllProcedures = (procedures, index) => {
    if (index >= procedures.length) {
      connection.end((err) => {
        if (err) {
          console.error("Error ending the connection:", err);
          return;
        }
        console.log("Connection closed.");
        if (errorOccurred) {
          console.error("Errors occurred during procedure execution.");
        } else {
          console.log("All procedures executed successfully.");
        }
      });
      return;
    }

    const proc = procedures[index];
    executeProcedure(proc, () => {
      executeAllProcedures(procedures, index + 1);
    });
  };

  executeAllProcedures(procedures, 0);
});
