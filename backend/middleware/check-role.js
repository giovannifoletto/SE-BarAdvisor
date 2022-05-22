const mongoose = require('mongoose')

const Locale = require('../models/Locale')

// controllare se, durante la creazione di un nuovo evento, l'utente che sta facendo l'operazione è il proprietario del locale che organizza l'evento
exports.checkOwnerLocale = async (req, res, next) => {
    const { nome, locale, dataInizio } = req.body
    const userData = req.userData

    if (!nome || !locale || !dataInizio)
        return res.status(400).json({ success: false, message: 'Fornire tutti i campi' })

    try {
        const localeOrganizzatore = await Locale.findById(locale)

        if (! localeOrganizzatore)
            return res.status(404).json({ success: false, message: 'Locale inesistente' })

        // console.log(String(exsistsLocale.gestore)) trasformare oggetto mongoose ObjectId a stringa
        if (! (String(localeOrganizzatore.gestore) === userData.id))
            return res.status(400).json({ success: false, message: 'Questo utente non è autorizzato a creare questo evento' })

        next()

    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}