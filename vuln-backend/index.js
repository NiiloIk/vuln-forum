const express = require('express')
const app = express()

const middleware = require('./utils/middleware')
const usersRouter = require('./controllers/users')
const postsRouter = require('./controllers/posts')
const commentsRouter = require('./controllers/comments')

// Middleware
app.use(express.json())
app.use(middleware.requestLogger)


// Endpoints
app.use('/api/posts', postsRouter)
app.use('/api/users', usersRouter)
app.use('/api/comments', commentsRouter)

// Start the server
const PORT = 3002
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})  