const fs = require('fs')

const Immagine = require('../models/Immagine')
const Evento = require('../models/Evento')

exports.uploadImmagine = async (req, res) => {
    try {
        const evento = await Evento.findById(req.params.eventoID)

        if (!evento)
            return res.status(404).json({ success: false, message: 'Evento inesistente' })
        
        // cancello l'immagine precedente
        await Immagine.deleteOne({ _id: evento.copertina })
        
        // creo e salvo quella nuova
        const immagine = new Immagine({
            file: {
                data: fs.readFileSync(`./uploads/${req.file.filename}`),
                contentType: req.file.mimetype
            }
        })
    
        const imm = await immagine.save()
        
        evento.copertina = imm._id

        await evento.save()

        fs.unlinkSync(`./uploads/${req.file.filename}`)

        res.status(200).json({ success: true, message: 'Immagine caricata correttamente', immagine: imm })

    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

exports.getImmagine = async (req, res) => {
    try {
        const evento = await Evento.findById(req.params.eventoID).populate('copertina', 'file')

        if (!evento)
            return res.status(404).json({ success: false, message: 'Evento inesistente' })
        
        res.status(200).json({ success: true, imm: evento.copertina })
    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}