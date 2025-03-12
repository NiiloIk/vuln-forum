const express = require('express')
require('dotenv').config()

console.log()
const app = express()

const postsRouter = require('./controllers/posts')
const middleware = require('./utils/middleware')

// Connect to MySQL database
const sequelize = require('./config/database')


// Middleware
app.use(express.json())
app.use(middleware.requestLogger)


// Endpoints
app.use('/api/posts', postsRouter)

app.get('/', (req, res) => {
    res.send("Endpoints at /api/posts")
})



// Start the server
const PORT = 3001

sequelize.sync().then(() => {
    console.log('Database synced')
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })  
}).catch(err => {
    console.error('Database sync error:', err);
});
