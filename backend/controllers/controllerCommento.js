const Commento = require('../models/Commento')
const Evento = require('../models/Evento')

exports.postCommento = async (req, res) => {
    const { commento } = req.body
    const userData = req.userData

    if (!commento)
        return res.status(400).json({ success: false, message: 'Compilare tutti i campi' })
    
    try {
        const nuovoCommento = new Commento({
            utente: userData.id,
            evento: req.params.eventoID,
            commento: commento
        })
        
        await nuovoCommento.save()

        const evento = await Evento.findById(req.params.eventoID)

        if (!evento)
            return res.status(400).json({ success: false, message: 'Evento inesistente' })

        evento.commenti.push(nuovoCommento._id)

        await evento.save()
        

        res.status(200).json({ success: true, message: 'Commento creato correttamente' })

    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}

// cancellare uno specifico commento di un evento specifico
exports.deleteCommento = async (req, res) => {
    try {
        const evento = await Evento.findById(req.params.eventoID)

        if (!evento)
            return res.status(400).json({ success: false, message: 'Evento inesistente' })
        
        // rimozione del commento dai commenti dell'evento e dal database
        evento.commenti = evento.commenti.filter(comm => String(comm) !== req.params.commentoID)
        await evento.save()
        
        await Commento.deleteOne({ _id: req.params.commentoID })

        res.status(200).json({ success: true, message: 'Commento cancellato correttamente' })

    } catch (err) {
        res.status(500).json({ success: false, error: err })
    }
}