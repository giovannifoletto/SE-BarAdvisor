const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const schemaUtente = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // regex per controllo email valida
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: true
    },
    ruolo: {
        type: String,
        enum: ['Cliente', 'GestoreLocale', 'Admin'],
        required: true
    },
    // per la figura Gestore Locale, viene salvato l'Id del Locale associato; per Cliente questo campo resta vuoto
    locale: {
        type: mongoose.Types.ObjectId,
        ref: 'Locale'
    },
    },
    {
        versionKey: false
    }
)

// funzione che automaticamente, prima di salvare un (nuovo) utente, hasha la password prima di salvarla nel database
schemaUtente.pre('save', async function(next) {
    if (! this.isModified('password'))
        next()
    
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

schemaUtente.methods.checkPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('Utente', schemaUtente)