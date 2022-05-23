const mongoose = require('mongoose')

const Locale = require('../models/Locale')

// controllare se, durante la creazione di un nuovo evento, l'utente che sta facendo l'operazione è il proprietario del locale che organizza l'evento
exports.checkOwnerLocale = async (req, res, next) => {
    const userData = res.userData

    // controllo se il Locale espresso nella route (sul quale si vuole postare) sia quello del Gestore che sta facendo la richiesta
    if (req.params.localeID !== userData.locale)
        return res.status(400).json({ success: false, message: 'Questo locale non corrisponde al suo' })

    try {
        const localeOrganizzatore = await Locale.findById(userData.locale)

        if (! localeOrganizzatore)
            return res.status(404).json({ success: false, message: 'Locale inesistente' })

        // controllo incrociato dalla parte del locale con il suo campo Gestore Locale
        if (! (String(localeOrganizzatore.gestore) === userData.id))
            return res.status(400).json({ success: false, message: 'Questo utente non è autorizzato a creare questo evento' })

        next()

    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}