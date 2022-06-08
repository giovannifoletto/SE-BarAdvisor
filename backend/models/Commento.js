const mongoose = require('mongoose')

const schemaCommento = new mongoose.Schema(
    {
    utente: {
        type: mongoose.Types.ObjectId,
        ref: 'Utente',
        required: true
    },
    evento: {
        type: mongoose.Types.ObjectId,
        ref: 'Evento',
        required: true
    },
    commento: {
        type: String,
        required: true
    }
    },
    {
        versionKey: false
    }
)

module.exports = mongoose.model('Commento', schemaCommento)