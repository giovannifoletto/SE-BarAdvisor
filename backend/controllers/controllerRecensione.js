const Recensione = require('../models/Recensione')
const Locale = require('../models/Locale')

// ritorna tutte le recensioni del locale
exports.getAllRecensioni = async (req, res) => {
    try {
        const locale = await Locale.findById(req.params.localeID)

        if (! locale)
            return res.status(404).json({ success: false, message: 'Locale non valido' })
        
        const recensioni = await Recensione.find()
        .where('localeId').equals(req.params.localeID)

        res.status(200).json({ success: true, recensioni: recensioni })

    } catch (err) {
        res.status(500).json({ success: false, error: err })
    }
}

// creare una recensione per un locale specifico
exports.postRecensione = async (req, res) => {
    // recupero i dati dalla richiesta
    const { commento, votazione } = req.body
    const utente = req.userData

    if (!commento || !votazione)
        return res.status(400).json({ success: false, message: 'Compilare tutti i campi' })
    
    try {
        const locale = await Locale.findById(req.params.localeID)

        if (! locale)
            return res.status(404).json({ success: false, message: 'Locale invalido' })
        
        // creazione nuova recensione
        const recensione = new Recensione({
            utente: utente.id,
            locale: req.params.localeID,
            commento: commento,
            votazione: votazione
        })

        // logica per calcolare il ranking come media delle votazioni delle recensioni
        if (locale.ranking === 0)
            locale.ranking = recensione.votazione
        else
            locale.ranking = (locale.ranking * locale.recensioni.length + recensione.votazione) / (locale.recensioni.length + 1)

        // salvataggio recensione e aggiunta della recensione nelle recensioni del locale
        await recensione.save()

        locale.recensioni.push(recensione._id)
        await locale.save()

        res.status(201).json({ success: true, message: 'Recensione creata correttamente' })

    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}

// cancellare una specifica recensione di un locale specifico
exports.deleteRecensione = async (req, res) => {
    try {
        const locale = await Locale.findById(req.params.localeID)
        const recensione = await Recensione.findById(req.params.recensioneID)

        if (!locale || !recensione)
            return res.status(400).json({ success: false, message: 'Locale inesistente' })
        
        // aggiornamento del ranking del locale
        if (locale.recensioni.length === 1)
            locale.ranking = 0
        else
            locale.ranking = (locale.ranking * locale.recensioni.length - recensione.votazione) / (locale.recensioni.length - 1)
        
        // rimozione della recensione dalle recensioni del locale e dal database
        locale.recensioni = locale.recensioni.filter(rec => String(rec) !== req.params.recensioneID)
        await locale.save()
        
        await Recensione.deleteOne({ _id: req.params.recensioneID })

        res.status(200).json({ success: true, message: 'Recensione cancellate correttamente' })

    } catch (err) {
        res.status(500).json({ success: false, error: err })
    }
}