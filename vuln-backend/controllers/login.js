const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const pool = require('../config/db')


loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body
    let user
    try {
        const [rows] = await pool.query(
            `SELECT * FROM users WHERE username=?`,
            [username]
        )
        user = rows[0]
    } catch (error) {
        console.error("Database query failed:", error)
        res.status(500).json({ message: "invalid username or password" })
    }

    const passwordCorrect =
        !user ? false : password === user.password 
    
    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        usernanme: user.username,
        id: user.id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    res.cookie('userToken', token, { 
        secure: false,
        sameSite: 'lax',
        httpOnly: true
    })

    res.cookie('username', user.username, {
        secure: false,
        sameSite: 'lax',
    })

    res.status(200).send()
})

loginRouter.get('/logout', async (req, res) => {
    res.clearCookie('username', {
        secure: false,
        sameSite: 'lax',
        httpOnly: true
    })
    res.clearCookie('userToken', {
        secure: false,
        sameSite: 'lax',
    })
    res.status(200).send()
})

module.exports = loginRouter