const mysql = require('mysql2/promise');

// Create a database connection (correctly awaited)
let con;
async function initDB() {
  try {
    con = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "[E7£0!)Do0bdc]DsQXT9",
      database: "forumdb"
    });
    console.log("Connected to MySQL database!");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit if DB connection fails
  }
}

initDB()

const express = require('express')
const app = express()

// const postsRouter = require('./controllers/posts')
const middleware = require('./utils/middleware')


// Middleware
app.use(express.json())
app.use(middleware.requestLogger)


// Endpoints
app.get('/', async (req, res) => {
  try {
    const [rows] = await con.query("SELECT * FROM post");
    res.json(rows); // Use `json()` instead of `send()`
  } catch (error) {
    console.error("Database query failed:", error);
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// Start the server
const PORT = 3002
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})  