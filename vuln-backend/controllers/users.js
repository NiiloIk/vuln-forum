const usersRouter = require('express').Router()
const pool = require('../config/db')

// Helper function
const makeAQuery = async (req, res, queryString, values=[]) => {
  try {
    const [rows] = await pool.query(
      queryString,
      values
    )
    res.json(rows)
  } catch (error) {
    console.error("Database query failed:", error)
    res.status(500).json({ message: "Error fetching users" })
  }
}

const allUsersQueryString = "SELECT username FROM users"

// Endpoints
usersRouter.post('/', async (req, res) => {
    const body = req.body

    if (!body.email || !body.password || !body.username) {
        return res.status(400).json({ 
          error: 'content missing' 
        })
    }
    
    // If the role is not specified it is set to user.
    const role = body.role ? body.role : "user"

    try {
      await pool.execute(
        `INSERT INTO users (role, email, password, username) VALUES (?, ?, ?, ?);`,
        [role, body.email, body.password, body.username]
      )
      res.status(204)
    } catch (error) {
      console.error("Database query failed:", error)
      res.status(500).json({ message: "Error fetching users" })
    }
})

// Returns all posts made by a single user.
usersRouter.get('/:id', (req, res) => {
    const id = req.params.id

    makeAQuery(req, res, 
      `SELECT posts.id, user_id, title, content, created_at, modified_at, users.username FROM posts LEFT JOIN users ON users.id = posts.user_id WHERE posts.user_id = ? ORDER BY created_at DESC;`,
      [id]
    )
})


usersRouter.delete('/:id', async (req, res) => {
    const id = Number(req.params.id)
    try {
      await pool.execute(
        `DELETE FROM users WHERE id=?;`,
        [id]
      )
      res.status(204)
    } catch (error) {
      console.error("Database query failed:", error)
      res.status(500).json({ message: "Error deleting user" })
    }
})

module.exports = usersRouter