const Locale = require('../models/Locale')
const Utente = require('../models/Utente')

// Ritorna un locale specifico
exports.getLocale = async (req, res) => {
    try {
        const locale = await Locale.findById(req.params.localeID)
        .populate('gestore', 'nome')
        .populate('eventi', 'nome dataInizio')
        .populate('recensioni', 'utente locale commento votazione')

        if (! locale)
            return res.status(404).json({ success: false, message: 'Locale non trovato' })
        
        const eventiPassati = []
        const prossimiEventi = []

        // se ho eventi, allora li divido, altrimenti non faccio nulla
        if (locale.eventi.length > 0) {
            const data = new Date()

            // divido gli eventi in base alla data attuale
            locale.eventi.forEach(evento => {
                if (evento.dataInizio < data)
                    eventiPassati.push(evento)
                else
                    prossimiEventi.push(evento)
            })
        }

        // il campo "eventi" ora non serve più quindi lo tolgo
        locale.eventi = undefined

        // aggiungo i due campi risultanti dalla divisione degli eventi
        locale.prossimiEventi = prossimiEventi
        locale.eventiPassati = eventiPassati

        res.status(200).json({ success: true, locale, eventiPassati, prossimiEventi })

    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}

// Ritorna i locali non verificati
exports.getLocaliDaConfermare = async (req, res) => {
    try {
        console.log("qui")
        const locali = await Locale.find({ verificato: false })

        res.status(200).json({ success: true, locali })
    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}

// Verifica di un locale
exports.verificaLocale = async (req, res) => {
    try {
        const locale = await Locale.findById(req.params.localeID)

        if (!locale)
            return res.status(500).json({ success: false, message: 'Locale inesistente' })
        
        locale.verificato = true
        await locale.save()

        res.status(200).json({ success: true, message: 'Locale verificato correttamente' })

    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}

// Seguire un locale
exports.followLocale = async (req, res) => {
    const userData = req.userData

    try {
        const locale = await Locale.findById(req.params.localeID)
        const utente = await Utente.findById(userData.id)

        if (!locale || !utente)
            return res.status(400).json({ success: false, message: 'Locale inesistente' })
        
        utente.localiSeguiti.push(locale._id)
        locale.followers.push(utente._id)

        await locale.save()
        await utente.save()

        res.status(200).json({ success: true, message: 'Locale seguito correttamente' })

    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}

// Non seguire più un locale
exports.unfollowLocale = async (req, res) => {
    const userData = req.userData

    try {
        const locale = await Locale.findById(req.params.localeID)
        const utente = await Utente.findById(userData.id)

        if (!locale || !utente)
            return res.status(400).json({ success: false, message: 'Locale inesistente' })
        
        // console.log(utente.localiSeguiti.length, locale.followers.length)

        utente.localiSeguiti = utente.localiSeguiti.filter(loc => { loc !== locale._id })
        locale.followers = locale.followers.filter(usr => { usr !== utente._id })

        // console.log(utente.localiSeguiti.length, locale.followers.length)
        await locale.save()
        await utente.save()

        res.status(200).json({ success: true, message: 'Locale smesso di seguire correttamente' })

    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}