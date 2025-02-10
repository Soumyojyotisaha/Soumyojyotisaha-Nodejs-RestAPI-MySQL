const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());

// Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to MySQL database");
});

// Fetch Students
app.get("/", (req, res) => {
    const sql = "SELECT * FROM student";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).json({ error: "Database error" });
        }
        return res.json(data);
    });
});

// Insert New Student
app.post("/create", (req, res) => {
    const sql = "INSERT INTO student (`Name`, `Email`) VALUES (?, ?)";
    const values = [req.body.name, req.body.email];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ error: "Database error" });
        }
        return res.json({ message: "Student added successfully", id: result.insertId });
    });
});


// Update Student
app.put('/update/:id', (req, res) => {
    const sql = "update student set `Name` = ?, `Email` = ? where ID = ?";
    const values = [
        req.body.name,
        req.body.email
    ];
    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) => {
        if (err) {
            console.error("Error updating student:", err);
            return res.status(500).json({ error: "Failed to update student" });
        }
        console.log("Student updated successfully");
        return res.status(200).json({ message: "Student updated successfully", data: data });
    });
});

//Delete data

// Update Student
app.delete('/student/:id', (req, res) => {
    const sql = "DELETE FROM student WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error("Error updating student:", err);
            return res.status(500).json({ error: "Failed to delete student" });
        }
        console.log("Student deleted successfully");
        return res.status(200).json({ message: "Student updated successfully", data: data });
    });
});


// Start Server
app.listen(8081, () => {
    console.log("Server running on port 8081");
});
