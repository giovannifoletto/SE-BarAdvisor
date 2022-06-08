const mongoose = require('mongoose')

const schemaImmagine = new mongoose.Schema({
    file: {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model('Immagine', schemaImmagine)