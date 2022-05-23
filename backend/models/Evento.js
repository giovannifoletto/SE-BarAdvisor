const mongoose = require('mongoose')

const eventoSchema = new mongoose.Schema(
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
    }
    },
    {
        versionKey: false
    }
)

module.exports = mongoose.model('Evento', eventoSchema)