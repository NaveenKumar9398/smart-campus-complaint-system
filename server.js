require("dotenv").config({
    path: __dirname + "/.env",
    override: true
});
const express = require("express");
const path = require("path");
const mysql = require("mysql2/promise");

const app = express();
const PORT = process.env.PORT || 3000;

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Naveen@2005",
  database: process.env.DB_NAME || "smart_campus",
  waitForConnections: true,
  connectionLimit: 10
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true, message: "Database connected" });
  } catch (err) {
    res.status(500).json({ ok: false, message: "Database connection failed" });
  }
});

app.get("/api/complaints", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM complaints ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/complaints", async (req, res) => {
  const {
    student_name, student_id, category, location,
    title, description, priority
  } = req.body;

  if (!student_name || !student_id || !category || !location || !title || !description) {
    return res.status(400).json({ error: "Please fill all required fields." });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO complaints
       (student_name, student_id, category, location, title, description, priority)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [student_name, student_id, category, location, title, description, priority || "Medium"]
    );

    res.status(201).json({
      message: "Complaint submitted successfully.",
      id: result.insertId
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/complaints/:id/status", async (req, res) => {
  const { status } = req.body;
  const allowed = ["Pending", "In Progress", "Resolved"];

  if (!allowed.includes(status)) {
    return res.status(400).json({ error: "Invalid status." });
  }

  try {
    const [result] = await pool.query(
      "UPDATE complaints SET status=? WHERE id=?",
      [status, req.params.id]
    );

    if (!result.affectedRows) {
      return res.status(404).json({ error: "Complaint not found." });
    }

    res.json({ message: "Status updated." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/complaints/:id", async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM complaints WHERE id=?",
      [req.params.id]
    );

    if (!result.affectedRows) {
      return res.status(404).json({ error: "Complaint not found." });
    }

    res.json({ message: "Complaint deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Smart Campus running at http://localhost:${PORT}`);
});
