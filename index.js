const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3306;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// connect to dabase
const db = mysql.createConnection({
    host: "localhost",
    port: process.env.PORT || 3306,
    user: "root",
    password: "track123",
    database: "employee_tracker",
  },
    console.log(`Connected to employee_tracker database`)
);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});