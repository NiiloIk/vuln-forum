const commentsRouter = require('express').Router()
const pool = require('../config/db')

// Helper function
const makeAQuery = async (req, res, queryString) => {
  try {
    const [rows] = await pool.query(queryString)
    res.json(rows)
  } catch (error) {
    console.error("Database query failed:", error)
    res.status(500).json({ message: "Error fetching comments" })
  }
}

// Endpoints
commentsRouter.get('/', (req, res) => {
  makeAQuery(req, res, "SELECT * FROM comments")
})

commentsRouter.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    makeAQuery(req, res, `SELECT * FROM comments WHERE id=${id}`)
})

module.exports = commentsRouter