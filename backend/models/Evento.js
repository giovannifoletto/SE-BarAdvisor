const mongoose = require('mongoose')

const schemaEvento = new mongoose.Schema(
    {
    nome: {
        type: String,
        required: true
    },
    locale: {
        type: mongoose.Types.ObjectId,
        ref: 'Locale',
        required: true
    },
    descrizione: String,
    dataInizio: {
        type: Date,
        required: true
    },
    prenotazioni: {
        type: [mongoose.Types.ObjectId],
        ref: 'Utente'
    },
    commenti: {
        type: [mongoose.Types.ObjectId],
        ref: 'Commento'
    },
    copertina: {
        type: mongoose.Types.ObjectId,
        ref: 'Immagine'
    },
    posti: Number
    },
    {
        versionKey: false
    }
)

module.exports = mongoose.model('Evento', schemaEvento)