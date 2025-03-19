const express = require('express')
const app = express()
const path = require('path')



// Endpoints
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "pages", "frontpage", "frontpage.html"))
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "pages", "login", "login.html"))
})

app.get('/users/:id', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "pages", "user", "userPage.html"))
})

app.get('/posts/:id', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "pages", "singlePost", "singlePost.html"))
})

app.use(express.static(path.join(__dirname, "public")))


// Start the server
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})  