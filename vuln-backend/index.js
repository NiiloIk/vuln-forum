const express = require('express')
const cors = require('cors')
const app = express()


const middleware = require('./utils/middleware')
const usersRouter = require('./controllers/users')
const postsRouter = require('./controllers/posts')
const loginRouter = require('./controllers/login')

// Middleware
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)

// Endpoints
app.use('/api/login', loginRouter)
app.use('/api/posts', postsRouter)
app.use('/api/users', usersRouter)

// Start the server
const PORT = 3002
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})  