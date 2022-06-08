const jwt = require('jsonwebtoken')
const config = require('../config')

// middleware per il controllo dell'autenticazione dell'utente:
module.exports = (req, res, next) => {
    try {
        // si controlla semplicemente se esiste un token nel campo "Authorization" nell'header della request
        // l'header è del tipo: "Bearer token..."
        const bearerToken = req.headers['authorization']
        console.log(bearerToken)

        if (!bearerToken)
            return res.status(401).json({ success: false, message: "Utente non loggato, impossibile procedere" })

        // se esiste, si controlla e se è corretto, si spacchetta e si aggiunge un campo con i dati dell'utente nella response
        const token = bearerToken.split(" ")[1]
        const decode = jwt.verify(token, config.SECRET_KEY)
        
        req.userData = decode

        next()

    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}