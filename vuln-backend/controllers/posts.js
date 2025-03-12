const postsRouter = require('express').Router()
const Post = require('../models/posts')
const mysql = require('mysql2')
let posts = [
    {
      id: 1,
      user_id: 101,
      title: "Getting Started with JavaScript",
      content: "JavaScript is a versatile programming language used for web development...",
      likes: 25,
      created_at: "2025-03-06T10:00:00Z",
      modified_at: "2025-03-06T12:00:00Z"
    },
    {
      id: 2,
      user_id: 102,
      title: "Understanding Async/Await",
      content: "Async/Await makes handling asynchronous code much easier in JavaScript...",
      likes: 42,
      created_at: "2025-03-05T15:30:00Z",
      modified_at: "2025-03-06T09:15:00Z"
    },
    {
      id: 3,
      user_id: 103,
      title: "CSS Tricks for Responsive Design",
      content: "Responsive design is crucial for modern web applications...",
      likes: 30,
      created_at: "2025-03-04T18:45:00Z",
      modified_at: "2025-03-05T08:20:00Z"
    }
]

const generateId = () => {
    const maxId = posts.length > 0
      ? Math.max(...posts.map(n => Number(n.id)))
      : 0
    return maxId + 1
}

postsRouter.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll()
    res.json(posts)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts.'})
  }
})

postsRouter.post('/', (req, res) => {
    const body = req.body

    if (!body.content) {
        return res.status(400).json({ 
          error: 'content missing' 
        })
    }

    const post = {
        id: generateId(),
        user_id: body.user_id,
        title: body.title,
        likes: 0,
        content: body.content,
        created_at: new Date(),
        modified_at: new Date(),
    }

    posts = posts.concat(post)
    res.json(post)
})

postsRouter.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const post = posts.find(post => post.id === id)

    if (post) {
        res.json(post)
    } else {
        res.status(404).end()
    }
})


postsRouter.delete('/:id', (req, res) => {
    const id = Number(req.params.id)

    if (posts.find(post => post.id === id)) {
      posts = posts.filter(post => post.id !== id)
      res.status(204).end()

    } else {
      res.status(400).json({
        error: "Cannot delete the post as it does not exist"
      })
    }
})

postsRouter.post('/:id/like', (req, res) => {
  const id = Number(req.params.id)
  const post = posts.find(post => post.id === id)

  if (post) {
    post.likes += 1
      res.json(post)
  } else {
      res.status(404).end()
  }
})

module.exports = postsRouter