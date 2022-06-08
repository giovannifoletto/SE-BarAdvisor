const Locale = require('../models/Locale')
const Recensione = require('../models/Recensione')
const Commento = require('../models/Commento')

// controllare se l'utente che sta facendo l'operazione è il proprietario del locale
exports.checkPermessiProprietarioLocale = async (req, res, next) => {
    const userData = req.userData

    try {
        const localeOrganizzatore = await Locale.findById(userData.locale)

        if (! localeOrganizzatore)
            return res.status(404).json({ success: false, message: 'Locale inesistente' })

        // controllo se il Locale espresso nella route sia quello del Gestore che sta facendo la richiesta
        if (req.params.localeID !== userData.locale)
        return res.status(403).json({ success: false, message: 'Permessi mancanti per accedere alla risorsa' })

        // controllo incrociato dalla parte del locale con il suo campo Gestore Locale
        if (String(localeOrganizzatore.gestore) !== userData.id)
            return res.status(403).json({ success: false, message: 'Permessi mancanti per effettuare questa operazione' })

        next()

    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
},

// verifico che durante la cancellazione di una recensione, l'utente sia colui che ha creato tale recensione o un admin
exports.checkPermessiCreatoreRecensione = async(req, res,next) => {
    const userData = req.userData

    try {
        const recensione = await Recensione.findById(req.params.recensioneID)

        if (! recensione)
            return res.status(404).json({ success: false, message: 'Recensione non trovata' })

        if (String(recensione.utente) !== userData.id && userData.ruolo !== 'Admin')
            return res.status(403).json({ success: false, message: 'Questo utente non è autorizzato a svolgere questa azione' })
    
        next()

    } catch (err){
        res.status(500).json({ success: false, error: err.message })
    }
}

// verifico che durante la cancellazione di un commento, l'utente sia colui che ha creato tale commento o un admin
exports.checkPermessiCreatoreCommento = async(req, res,next) => {
    const userData = req.userData

    try {
        const commento = await Commento.findById(req.params.commentoID)

        if (! commento)
            return res.status(404).json({ success: false, message: 'Commento non trovato' })

        if (String(commento.utente) !== userData.id && userData.ruolo !== 'Admin')
            return res.status(403).json({ success: false, message: 'Questo utente non è autorizzato a svolgere questa azione' })
    
        next()

    } catch (err){
        res.status(500).json({ success: false, error: err.message })
    }
}