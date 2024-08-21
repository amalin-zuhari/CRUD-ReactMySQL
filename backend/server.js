const express = require("express"); // Import express for server functionality
const mysql = require("mysql2"); // Import mysql for database connectivity
const cors = require("cors"); // Import cors for Cross-Origin Resource Sharing

const app = express(); // Create an instance of the express application
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Middleware to enable CORS

// Create a MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Amalin@SQL24",
    database: "mysqlreact"
});

// Route to get all students
app.get("/", (req, res) => {
const sql = "SELECT * FROM task3"; // SQL query to fetch all students
db.query(sql, (err, data) => {
    if (err) {
        res.json(err);
    } else {
        res.json(data);
    }
});
});

// Route to create a new student
app.post("/create", (req, res) => {
    const sql = "INSERT INTO task3(name, email, marks, grade, city) VALUES (?, ?, ?, ?, ?)";
    const values = [
      req.body.name, // Get name from request body
      req.body.email, // Get email from request body
      req.body.marks, // Get marks from request body
      req.body.grade, // Get grade from request body
      req.body.city, // Get city from request body
    ];

    db.query(sql, values, (err, data) => {
      if (err) {
        console.error("Database Insert Error:", err); // Log the error to the console
        return res.status(500).json({ error: "Failed to create student", details: err }); // Return error response
      }
      return res.status(201).json({ message: "Student created successfully!", data });
    });
});


//Route to update a student
app.put("/update/:id", (req, res) => {
    const id = req.params.id; // Get student ID from route parameters
    const { name, email, marks, grade, city } = req.body; // Destructure fields from request body

    // Initialize SQL query and values array
    let sql = "UPDATE task3 SET ";
    let values = [];

    // Add fields to the SQL query and values array based on provided data
    if (name) {
        sql += "name = ?, ";
        values.push(name);
    }
    if (email) {
        sql += "email = ?, ";
        values.push(email);
    }
    if (marks) {
        sql += "marks = ?, ";
        values.push(marks);
    }
    if (grade) {
        sql += "grade = ?, ";
        values.push(grade);
    }
    if (city) {
        sql += "city = ?, ";
        values.push(city);
    }

    // Remove trailing comma and space
    sql = sql.slice(0, -2);
    sql += " WHERE id = ?";
    values.push(id);

    // Execute the query
    db.query(sql, values, (err, data) => {
        if (err) {
            res.status(500).json({ error: err.message }); // Send error response if query fails
        } else {
            res.json(data); // Send success response with data
        }
    });
});

//Route to delete a student
app.delete("/delete/:id", (req, res) => {
    const sql = "DELETE FROM task3 WHERE id = ?"; // SQL query to delete a student
    const id = req.params.id
    db.query(sql, [id], (err, data) => { // Execute the query
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
});

// Start the server
app.listen(5001, () => {
    console.log("Server is running on port 5001");
});