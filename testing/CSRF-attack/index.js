const express = require('express')
const app = express()
const path = require('path')


// Endpoints
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "csrf-delete-user-attack.html"))
})

app.get('/delete-post', (req, res) => {
    res.sendFile(path.join(__dirname, "csrf-delete-post-attack.html"))
})

app.get('/tests', (req, res) => {
    res.sendFile(path.join(__dirname, "csrf-attack-tests.html"))
})

// Start the server
const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})  