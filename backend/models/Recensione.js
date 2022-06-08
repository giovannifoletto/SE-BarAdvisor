const mongoose = require('mongoose')

const schemaRecensione = new mongoose.Schema(
    {
    utente: {
        type: mongoose.Types.ObjectId,
        ref: 'Utente',
        required: true
    },
    locale: {
        type: mongoose.Types.ObjectId,
        ref: 'Locale',
        required: true
    },
    commento: {
        type: String,
        required: true
    },
    votazione: {
        type: Number
    }
    },
    {
        versionKey: false
    }
)

module.exports = mongoose.model('Recensione', schemaRecensione)