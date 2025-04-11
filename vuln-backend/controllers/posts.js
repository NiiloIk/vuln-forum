const postsRouter = require('express').Router()
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
    res.status(500).json({ message: "Error fetching posts" })
  }
}

const singlePostQueryString = `SELECT u.username AS post_creator, u.id AS user_id, p.title, p.content, p.created_at AS post_created_at, p.modified_at AS post_modified_at, 
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'comment_id', c.id,
            'commenter', u2.username,
            'commenter_id', u2.id,
            'comment', c.comment,
            'comment_created_at', c.created_at
        )
    ) AS comments FROM posts as p
    INNER JOIN users AS u ON p.user_id = u.id
    LEFT JOIN comments AS c ON p.id = c.post_id
    LEFT JOIN users AS u2 ON c.user_id = u2.id
    WHERE p.id = ?
    ORDER BY c.created_at;`

const multiplePostsQueryString = `SELECT posts.id, user_id, title, content, created_at, modified_at, users.username FROM posts INNER JOIN users ON users.id = posts.user_id ORDER BY created_at DESC`

// Endpoints for posts
postsRouter.get('/', (req, res) => {
  makeAQuery(req, res, multiplePostsQueryString)
})

postsRouter.post('/', async (req, res) => {
  const user = req.user
  if (user === null) {
    return res.status(401).json({ error: 'invalid token' })
  }

  const body = req.body
  console.log(body)
  if (!body.title || !body.content) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  try {

    // Correct way according to documentation.
    await pool.execute(
      `INSERT INTO posts (user_id, title, content) VALUES(?, ?, ?);`,
      [user.id, body.title, body.content]
    )
    makeAQuery(req, res, multiplePostsQueryString)
  } catch (error) {
    console.error("Database query failed:", error)
    res.status(500).json({ message: "Error fetching posts" })
  }
})

postsRouter.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  makeAQuery(req, res, singlePostQueryString, [id])
})

// Deletes a post
postsRouter.post('/:id/delete', async (req, res) => {
  const id = Number(req.params.id)

  const user = req.user
  if (user === null) {
    return res.status(401).json({ error: 'invalid token' })
  }

  try {
    const post_user = await pool.query(
      `SELECT users.id FROM posts LEFT JOIN users ON users.id = posts.user_id WHERE posts.id = ?;`,
      [id]
    )
    const post_user_ID = post_user[0][0]['id']
    if (post_user_ID !== user.id) {
      res.status(403).json({ message: "Unauthorized."})
    } else {
      await pool.execute(
        `DELETE FROM posts WHERE id=?;`,
        [id]
      )
      makeAQuery(req, res, multiplePostsQueryString)
    }
  } catch (error) {
    console.error("Database query failed:", error)
    res.status(500).json({ message: "Error fetching posts" })
  }
})

postsRouter.post('/:id/comment', async (req, res) => {
  const user = req.user

  if (user === null) {
    return res.status(401).json({ error: 'invalid token' })
  }

  const body = req.body
  const post_id = Number(req.params.id)

  if (!body.comment) {
    return res.status(400).json({
      error: 'content missing'
    })
  }
  try {
    await pool.execute(
      `INSERT INTO comments (post_id, user_id, comment) VALUES (?, ?, ?);`,
      [post_id, user.id, body.comment]
    )

    makeAQuery(req, res, singlePostQueryString, [post_id])
  } catch (error) {
    console.error("Database query failed:", error)
    res.status(500).json({ message: "Error fetching comments" })
  }
})

// TODO: Doesn't check user who deletes a comment.
postsRouter.delete('/:id/comment/:comment_id', async (req, res) => {
  const post_id = Number(req.params.id)
  const comment_id = Number(req.params.comment_id)
  try {
    await pool.execute(
      `DELETE FROM comments WHERE id=?;`,
      [comment_id]
    )
    makeAQuery(req, res, singlePostQueryString, [post_id])
  } catch (error) {
    console.error("Database query failed:", error)
    res.status(500).json({ message: "Error fetching comments" })
  }
})

module.exports = postsRouter