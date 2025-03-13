const usersRouter = require('express').Router()
const pool = require('../config/db')

// Helper function
const makeAQuery = async (req, res, queryString) => {
  try {
    const [rows] = await pool.query(queryString)
    res.json(rows)
  } catch (error) {
    console.error("Database query failed:", error)
    res.status(500).json({ message: "Error fetching users" })
  }
}

// Endpoints
usersRouter.get('/', (req, res) => {
  makeAQuery(req, res, "SELECT * FROM users")
})

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
      await pool.execute(`INSERT INTO users (role, email, password, username) VALUES ('${role}', '${body.email}', '${body.password}', '${body.username}');`)
      makeAQuery(req, res, `SELECT * FROM users;`)
    } catch (error) {
      console.error("Database query failed:", error)
      res.status(500).json({ message: "Error fetching users" })
    }
})

// This needs to return the posts of a certain users.
usersRouter.get('/:id', (req, res) => {
    const id = Number(req.params.id)

    makeAQuery(req, res, `SELECT * FROM posts WHERE posts.user_id = ${id} ORDER BY created_at;`)
})


usersRouter.delete('/:id', async (req, res) => {
    const id = Number(req.params.id)
    try {
      await pool.execute(`DELETE FROM users WHERE id=${id};`)
      makeAQuery(req, res, `SELECT * FROM users;`)
    } catch (error) {
      console.error("Database query failed:", error)
      res.status(500).json({ message: "Error fetching users" })
    }
})

module.exports = usersRouter