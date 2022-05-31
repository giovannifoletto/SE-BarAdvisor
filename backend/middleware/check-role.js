const Locale = require('../models/Locale')

// controllare se l'utente che sta facendo l'operazione è il proprietario del locale presente nell'URL
// per l'utilizzo: è richiesta la presenza nell'URL dell'ID del locale, oltre ad un utente loggato
exports.checkOwnerLocale = async (req, res, next) => {
    const userData = res.userData

    // controllo se il Locale espresso nella route sia quello del Gestore che sta facendo la richiesta
    if (req.params.localeID !== userData.locale)
        return res.status(400).json({ success: false, message: 'Autorizzazione fallita' })

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