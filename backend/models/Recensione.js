const mongoose = require('mongoose')

const recensioneSchema = new mongoose.Schema({
    utenteID: {
        type: mongoose.Types.ObjectId,
        ref: 'Utente',
        required: true
    },
    localeID: {
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

module.exports = mongoose.model('Recensione', recensioneSchema)