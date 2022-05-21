const jwt = require('jsonwebtoken')
const config = require('../config')

const Utente = require('../models/Utente')
const Locale = require('../models/Locale')

exports.getUtenti = async (req, res) => {
    try {
        // query nel database per prendere tutti gli utenti (e popolare il campo 'locale' dalla tabella 'Locale')
        const utenti = await Utente.find().populate('locale', 'nome')

        res.status(200).json({ success: true, utenti: utenti })

    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}

exports.registrazioneLocale = async (req, res) => {
    const { nome, email, password, nomeLocale, posizione } = req.body

    // controllo se gli input non sono vuoti
    if (!nome || !email || !password || !nomeLocale || !posizione)
        return res.status(400).json({ success: false, message: 'Compilare tutti i campi' })

    try {
        // controllo se il locale o l'utente esistono già
        const utenteEsiste = await Utente.findOne({ email: email })
        const localeEsiste = await Locale.findOne({ posizione: posizione })

        if (utenteEsiste || localeEsiste) {
            return res.status(400).json({ success: false, messaggio: 'Registrazione fallita, utente o locale già esistenti' })
        }

        // creazione dell'utente Gestore Locale
        const utente = new Utente({
            nome: nome,
            email: email,
            password: password,
            ruolo: 'GestoreLocale'
        })

        // creazione del locale associato
        const locale = new Locale({
            nome: nomeLocale,
            gestore: utente._id,
            posizione: posizione
        })

        utente.locale = locale._id

        // salvataggio dati nel database
        const newUtente = await utente.save()
        const newLocale = await locale.save()

        res.status(200).json({ success: true, utente: newUtente, locale: newLocale })

    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}

exports.registrazioneCliente = async (req, res) => {
    const { nome, email, password } = req.body

    // controllo se gli input non sono vuoti
    if (!nome || !email || !password)
        return res.status(400).json({ success: false, message: 'Compilare tutti i campi' })

    try {
        // controllo se nel database è già presente un Utente con la stessa mail
        const utentePresente = await Utente.findOne({ email: email })

        // se presente, ritornare un errore
        if (utentePresente)
            return res.status(400).json({ success: false, message: 'Utente già esistente' })
        
        // altrimenti creazione con i dati della richiesta
        const utente = new Utente({
            nome: nome,
            email: email,
            password: password,
            ruolo: 'Cliente'
        })

        // salvataggio utente nel database
        const nuovoUtente = await utente.save()

        res.status(200).json({ success: true, utente: nuovoUtente })

    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}

exports.loginUtente = async (req, res) => {
    const { email, password } = req.body

    // controllo su campi mancanti
    if (!email || !password)
        return res.status(400).json({ success: false, message: "Compilare tutti i campi" })
    
    try {
        // recupero utente dal database
        const utente = await Utente.findOne({ email: email })

        // se non esiste, ritorno un errore
        if (!utente)
            return res.status(400).json({ success: false, message: "Utente inesistente" })
        
        // controllo la password
        const passwordCorretta = await utente.checkPassword(password)

        // se sbagliata, ritorno un errore
        if (!passwordCorretta)
            return res.status(400).json({ success: false, message: "Password incorretta" })
        
        // se tutto va bene, creo il token aggiungendo i vari campi utili
        const token = jwt.sign({
            _id: utente._id,
            email: utente.email,
            ruolo: utente.ruolo,
            locale: utente.locale || ""
        },
        config.SECRET_KEY,
        {
            // il token scade dopo 1 giorno
            expiresIn: "1 day"
        })

        res.status(200).json({ success: true, token: token })
        
    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}