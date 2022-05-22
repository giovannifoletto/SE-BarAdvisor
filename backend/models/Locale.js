const mongoose = require('mongoose')

const schemaLocale = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    gestore: {
        type: mongoose.Types.ObjectId,
        ref: 'Utente',
        required: true,
        unique: true
    },
    posizione: {
        type: String,
        required: true,
        unique: true
    },
    descrizione: {
       type: String
    },
    prossimiEventi: {
        type: [mongoose.Types.ObjectId],
        ref: 'Evento'
    },
    eventiPassati: {
        type: [mongoose.Types.ObjectId],
        ref: 'Evento'
    }
    },
    {
        versionKey: false
    },
)

module.exports = mongoose.model('Locale', schemaLocale)