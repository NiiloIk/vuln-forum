const logger = require('./logger')
const jwt = require('jsonwebtoken')
const pool = require('../config/db')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '')
    } else {
        request.token = null
    }

    next()
}

const userExtractor = async (request, response, next) => {
    const token = request.token
    if (!token) {
        request.user = null
        return next()
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
        request.user = null
    } else {
        try {
            const [rows] = await pool.query(`SELECT * FROM users WHERE id='${decodedToken.id}'`)
            request.user = rows[0]
        } catch (error) {
            console.error("Database query failed:", error)
            res.status(500).json({ message: "Error fetching user" })
        }
    }

    next()
}



const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

module.exports = {
    tokenExtractor,
    userExtractor,
    requestLogger,
}