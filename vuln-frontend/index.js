const express = require('express')
const app = express()
const path = require('path')



// Endpoints
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, "src", "index.html"))
// })

app.use(express.static(path.join(__dirname, "public")))



// Start the server
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})  