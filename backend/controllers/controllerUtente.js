const jwt = require('jsonwebtoken')
const config = require('../config')
const crypto = require('crypto')

const Utente = require('../models/Utente')
const Locale = require('../models/Locale')
const Evento = require('../models/Evento')
const Recensione = require('../models/Recensione')
const Commento = require('../models/Commento')

const invioEmail = require('./invioEmail')

exports.getAllUtenti = async (req, res) => {
    try {
        // query nel database per prendere tutti gli utenti (e popolare il campo 'locale' dalla tabella 'Locale') 
        const utenti = await Utente.find()
            .populate('locale', 'nome')
            .populate('prenotazioni', 'nome')

        res.status(200).json({ success: true, utenti: utenti })

    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}

exports.getNomeUtente = async (req, res) => {
    try {
        const utente = await Utente.findById(req.params.utenteID).populate('prenotazioni', 'nome dataInizo')

        if (!utente)
            return res.status(400).json({ success: false, message: 'Utente inesistente' })

        res.status(200).json({ success: true, nomeUtente: utente.nome, prenotazioni: utente.prenotazioni, notifiche: utente.notifiche })
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

        if (!passwordCorretta)
            return res.status(400).json({ success: false, message: "Password incorretta" })

        // se tutto va bene, creo il token aggiungendo i vari campi utili
        const token = jwt.sign({
            id: utente._id,
            nome: utente.nome,
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

exports.passwordDimenticata = async (req, res) => {
    const { email } = req.body

    // controllo del contenuto ricevuto
    if (!email)
        return res.status(400).json({ success: false, message: 'Compilare i campi' })

    try {
        // controllo se l'utente esiste
        const user = await Utente.findOne({ email: email })

        if (!user) {
            return res.status(400).json({ success: false, message: 'Utente inesistente' })
        }

        // creazione di un token random che salviamo sull'utente corrispondente nel database
        const resetToken = crypto.randomBytes(20).toString('hex')

        user.tokenRecuperoPassword = crypto.createHash('sha256').update(resetToken).digest('hex')

        // impostiamo un tempo massimo per eseguire la procedura di reset della password
        user.scadenzaRecuperoPassword = Date.now() + 10 * 60 * 1000  //10 minuti

        await user.save()

        // messaggio che si invia per mail con il link al form di recupero
        const resetURL = `http://${config.HOST}:${config.FRONT_PORT}/resetpassword/${resetToken}`

        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password</p>
            <a href=${resetURL} clicktracking=off>${resetURL}`

        try {
            await invioEmail({
                to: user.email,
                subject: 'Richiesta reset password',
                text: message
            })

            res.status(200).json({ success: true, messaggio: 'Email inviata correttamente' })

        } catch (err) {
            // se ci sono problemi nell'invio della mail, resetto i campi nel database poichè l'operazione non è andata a buon fine
            user.tokenRecuperoPassword = undefined
            user.scadenzaRecuperoPassword = undefined

            await user.save()

            res.status(500).json({ success: false, error: err.message })
        }

    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}

exports.resetToken = async (req, res) => {
    const { password } = req.body

    // controllo del contenuto ricevuto
    if (!password) {
        return res.status(400).json({ success: false, message: 'Nessuna password inserita' })
    }

    // faccio l'hash del token ricevuto
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex')

    try {
        // controllo se esiste un utente con il token ricevuto e che non sia scaduto
        const user = await Utente.findOne({
            tokenRecuperoPassword: resetPasswordToken,
            scadenzaRecuperoPassword: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(400).json({ success: false, message: 'Token incorretto o scaduto' })
        }

        // aggiorno la password e resetto i campi utilizzati per il recupero
        user.password = password
        user.tokenRecuperoPassword = undefined
        user.scadenzaRecuperoPassword = undefined

        await user.save()

        res.status(200).json({ success: true, message: 'Password cambiata correttamente' })

    } catch (err) {
        res.status(500).json({ success: false, error: err })
    }
}

exports.changePassword = async (req, res) => {
    // recupero i campi dal body della richiesta
    const { oldPassword, newPassword } = req.body
    const userData = req.userData

    // controllo la presenza dei dati
    if (!oldPassword || !newPassword)
        return res.status(400).json({ success: false, message: 'Compilare tutti i campi' })

    try {
        // prendo dal database l'utente loggato che sta facendo la richiesta
        const user = await Utente.findById(userData.id)

        // se non esiste, errore
        if (!user)
            return res.status(400).json({ success: false, message: "Utente non trovato" })

        // controllo se la password attuale è corretta
        const correctPassword = await user.checkPassword(oldPassword)

        if (!correctPassword)
            return res.status(401).json({ success: false, message: 'Password attuale errata' })

        // aggiorno la password e salvo l'utente nel database
        user.password = newPassword

        await user.save()

        res.status(200).json({ success: true, message: 'Password cambiata correttamente' })

    }
    catch (err) {
        res.status(500).json({ success: false, error: err })
    }
}

exports.deleteAccount = async (req, res) => {
    const userData = req.userData

    try {
        // cancellare utente Cliente
        if (userData.locale === "") {

            const utente = await Utente.findById(userData.id)

            if (!utente)
                return res.status(404).json({ success: false, message: 'Utente inesistente' })

            utente.prenotazioni.forEach(async ev => {
                const evento = await Evento.findById(ev)
                evento.prenotazioni = evento.prenotazioni.filter(usr => String(usr) !== utente._id)
                await evento.save()
            })

            await Recensione.deleteMany({ utente: utente._id })
            await Commento.deleteMany({ utente: utente._id })

            await Utente.deleteOne({ _id: utente._id })

            res.status(200).json({ success: true, message: 'Utente cancellato correttamente' })
        }
        else {
            const locale = await Locale.findById(userData.locale)

            if (!locale)
                return res.status(404).json({ success: false, message: 'Locale inesistente' })

            await Evento.deleteMany({ _id: { $in: locale.eventi } })

            await Recensione.deleteMany({ utente: userData.id })
            await Commento.deleteMany({ utente: userData.id })

            await Locale.deleteOne({ _id: userData.locale })

            await Utente.deleteOne({ _id: userData.id })

            res.status(200).json({ success: true, message: 'Utente cancellato correttamente' })

        }

    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}
