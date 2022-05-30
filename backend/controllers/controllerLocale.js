const Locale = require('../models/Locale')

// Ritorna un locale
exports.getLocale = async (req, res) => {
    try {
        const locale = await Locale.findById(req.params.localeID)
        .populate('gestore', 'nome')
        .populate('eventi', 'nome dataInizio')

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

// Ritorna tutte le recensioni del locale
exports.getAllRecensioni = async (req, res) => {
    try {
        const locale = await Locale.findById(req.params.localeID)

        if (! locale)
            return res.status(400).json({ success: false, message: 'Locale non valido' })
        
        const recensioni = await Recensione.find()
        .where('localeId').equals(req.params.localeID)

        res.status(200).json({ success: true, recensioni: recensioni })

    } catch (err) {
        res.status(500).json({ success: false, error: err })
    }
}