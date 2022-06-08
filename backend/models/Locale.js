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
    eventi: {
        type: [mongoose.Types.ObjectId],
        ref: 'Evento'
    },
    recensioni: {
        type: [mongoose.Types.ObjectId],
        ref: 'Recensione'
    },
    ranking: {
        type: Number,
        default: 0
    },
    followers: {
        type: [mongoose.Types.ObjectId],
        ref: 'Utente'
    },
    verificato: {
        type: Boolean,
        default: false
    }
    },
    {
        versionKey: false
    },
)

module.exports = mongoose.model('Locale', schemaLocale)