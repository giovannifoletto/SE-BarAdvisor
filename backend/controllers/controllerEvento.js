const Evento = require('../models/Evento')
const Locale = require('../models/Locale')
const Utente = require('../models/Utente')
const Commento = require('../models/Commento')

// recuperare tutti gli eventi
exports.getAllEventi = async (req, res) => {
    try{
        const eventi = await Evento.find()
        .populate('locale', 'nome')
        .populate('prenotazioni', 'email')

        if (eventi.length >= 0)
            res.status(200).json({ success: true, eventi: eventi })
        else
            res.status(200).json({ success: false, message: "Nessun evento disponibile" })
    } 
    catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}

// creare un nuovo evento
exports.postEvento = async (req, res) => {
    // recupero dati dalla richiesta e dal token
    const { nome, descrizione, dataInizio } = req.body
    const userData = req.userData

    if (!nome || !dataInizio)
        return res.status(400).json({ success: false, message: 'Compilare tutti i campi' })

    try{
        const locale = await Locale.findById(userData.locale)

        if (!locale)
            return res.status(400).json({ success: false, message: 'Locale inesistente' })
        
        // creazione dell'evento
        const evento = new Evento({
            nome: nome,
            locale: userData.locale,
            descrizione: descrizione,
            dataInizio: Date.parse(dataInizio)
        })

        await evento.save()
        
        // salvo l'evento negli eventi del locale
        locale.eventi.push(evento)

        await locale.save()

        res.status(201).json({ success: true, message: 'Nuovo evento creato correttamente', eventoID: evento._id })

    } catch(err){
        res.status(500).json({ success: false, error: err.message })
    }
}

// recuperare un evento specifico
exports.getEvento = async (req, res) => {
    try{
        const evento = await Evento.findById(req.params.eventoID)
        .populate('locale', 'nome')
        .populate('prenotazioni', 'email')
        .populate('commenti', 'utente commento')

        if (!evento)
            return res.status(404).json({ success: false, message: 'Nessun evento trovato' })
        
        res.status(201).json({ success: true, evento: evento })
        
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}

exports.postPrenotazione = async (req, res) => {
    // recupero dei dati di login
    const userData = req.userData

    try {
        // recupero gli oggetti dal database
        const evento = await Evento.findById(req.params.eventoID)
        const utente = await Utente.findById(userData.id)

        if (!evento || !utente)
            return res.status(400).json({ success: false, message: 'Evento o Utente insesistente' })
        
        // se l'evento a cui si sta provando a prenotare è scaduto, errore
        if (Date.parse(evento.dataInizio) < Date.now())
            return res.status(400).json({ success: false, message: 'Impossibile prenotarsi a questo evento (scaduto)' })
        
        // controllo se l'utente è già prenotato all'evento
        let prenotazioneEffettuata = false
        evento.prenotazioni.forEach((usr) => {
            if (String(usr) === userData.id)
                prenotazioneEffettuata = true
        })

        // se non lo è, lo aggiungo alle prenotazioni dell'evento e aggiungo l'evento alle prenotazioni dell'utente
        if (prenotazioneEffettuata)
            return res.status(400).json({ success: false, message: 'Impossibile prenotarsi: risulta già effettuata' })
        else {
            evento.prenotazioni.push(userData.id)
            utente.prenotazioni.push(evento._id)

            await evento.save()
            await utente.save()
    
            res.status(200).json({ success: true, message: 'Prenotazione effettuata correttamente' })
        }
        
    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}

// rimuovere una prenotazione di un Utente ad un evento specifico
exports.deletePrenotazione = async (req, res) => {
    // recupero dei dati di login
    const userData = req.userData

    try {
        // recupero gli oggetti dal database
        const evento = await Evento.findById(req.params.eventoID)
        const utente = await Utente.findById(userData.id)

        if (!evento || !utente)
            return res.status(500).json({ success: false, message: 'Evento o Utente insesistente' })
        
        // controllo se l'utente è prenotato all'evento
        let prenotazioneEffettuata = false
        evento.prenotazioni.forEach((usr) => {
            if (String(usr) === userData.id)
                prenotazioneEffettuata = true
        })

        // se lo è, lo tolgo dalle prenotazioni dell'evento e tolgo l'evento dalle prenotazioni dell'utente
        if (prenotazioneEffettuata) {
            evento.prenotazioni = evento.prenotazioni.filter(usr => String(usr) !== userData.id)
            utente.prenotazioni = utente.prenotazioni.filter(usr => String(usr) !== String(evento._id))
            
            await evento.save()
            await utente.save()

            res.status(200).json({ success: true, message: 'Prenotazione cancellata correttamente' })
        }
        else
            res.status(404).json({ success: true, message: 'Impossibile cancellare: prenotazione non presente' })
        
    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}

// invio notifica ai partecipanti di un evento
exports.invioNotifica = async (req, res) => {
    // recupero del messaggio
    const { messaggio } = req.body
    const userData = req.userData

    if (!messaggio)
        return res.status(400).json({ success: false, messaggio: "Compilare tutti i campi" })
    
    try {
        // recupero dell'evento in questione
        const evento = await Evento.findById(req.params.eventoID)
        const locale = await Locale.findById(userData.locale)

        if (!evento || !locale)
            return res.status(400).json({ success: false, message: 'Evento e/o locale non trovati' })
        
        // aggiunta dei dettagli dell'evento e del locale
        const messaggioCompleto = 
            messaggio 
            + "//" + evento.nome
            + "//" + (new Date(evento.dataInizio)).toDateString()
            + "//" + locale.nome
        
        // salvataggio del messaggio nelle notifiche di tutti i partecipanti
        await evento.prenotazioni.forEach(async (usr) => {
            const utente = await Utente.findById(String(usr))
            if (utente)
            {
                utente.notifiche.push(messaggioCompleto)
                await utente.save()
            }
        })

        res.status(200).json({ success: true, message: 'Notifica inviata correttamente' })

    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}

exports.postCommento = async (req, res) => {
    const { commento } = req.body
    const userData = req.userData

    if (!commento)
        return res.status(400).json({ success: false, message: 'Compilare tutti i campi' })
    
    try {
        const nuovoCommento = new Commento({
            utente: userData.id,
            commento: commento
        })
        
        await nuovoCommento.save()

        const evento = await Evento.findById(req.params.eventoID)

        if (!evento)
            return res.status(400).json({ success: false, message: 'Evento inesistente' })

        evento.commenti.push(nuovoCommento._id)

        await evento.save()
        

        res.status(200).json({ success: true, message: 'Commento creato correttamente' })

    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}