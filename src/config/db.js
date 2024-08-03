const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "equip9-user",
    password: "equip9@123",
    database: "registration_db",
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

module.exports = connection;
