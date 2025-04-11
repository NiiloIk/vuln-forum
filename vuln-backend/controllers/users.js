const usersRouter = require('express').Router()
const pool = require('../config/db')
const { verifyCSRFToken } = require('../utils/middleware')

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

// const allUsersQueryString = "SELECT username FROM users"

// Endpoints
// Create a new user
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
      res.status(204).send()
    } catch (error) {
      console.error("Database query failed:", error)
      res.status(500).json({ message: "User creation failed" })
    }
})

// Returns all posts made by a single user.
usersRouter.get('/:id', (req, res) => {
    const id = Number(req.params.id)

    if (!id) {
      res.status(500).json({ message: "Error fetching user posts."})
    }

    makeAQuery(req, res, 
      `SELECT posts.id, user_id, title, content, created_at, modified_at, users.username FROM posts LEFT JOIN users ON users.id = posts.user_id WHERE posts.user_id = ? ORDER BY created_at DESC;`,
      [id]
    )
})

// Delete a user.
usersRouter.post('/:id/delete', verifyCSRFToken, async (req, res) => {
    const id = Number(req.params.id)
    const user = req.user
    if (user === null) {
      return res.status(401).json({ error: 'invalid token' })
    }

    try {
      if (id !== user.id) {
        res.status(403).json({ message: "Unauthorized."}).send()
      } else {
        await pool.execute(
          `DELETE FROM users WHERE id=?;`,
          [id]
        )
        res.status(204).send()
      }
    } catch (error) {
      console.error("Database query failed:", error)
      res.status(500).json({ message: "Error deleting user" })
    }
})

module.exports = usersRouter