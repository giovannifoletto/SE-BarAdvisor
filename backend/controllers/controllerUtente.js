const Utente = require('../models/Utente')
const Locale = require('../models/Locale')

exports.registrazioneLocale = async (req, res) => {
    const { nomeUtente, email, password, nomeLocale, posizione } = req.body

    // controllo se gli input non sono vuoti
    if (!nomeUtente || !email || !password || !nomeLocale || !posizione)
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
            nomeUtente: nomeUtente,
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