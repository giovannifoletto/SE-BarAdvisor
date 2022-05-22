const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = (req, res, next) => {
    try {
        // l'header è del tipo: "Bearer token..."
        const bearerToken = req.headers['authorization']
        const token = bearerToken.split(" ")[1]
        const decode = jwt.verify(token, config.SECRET_KEY)
        res.userData = decode
        next()
    } catch (err) {
        res.status(401).json({ success: false, error: err.message })
    }
}