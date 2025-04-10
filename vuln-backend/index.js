const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()


const middleware = require('./utils/middleware')
const usersRouter = require('./controllers/users')
const postsRouter = require('./controllers/posts')
const loginRouter = require('./controllers/login')

// Middleware
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json())
app.use(middleware.limiter)
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