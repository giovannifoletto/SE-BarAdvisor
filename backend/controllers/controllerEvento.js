const Evento = require('../models/Evento')
const Locale = require('../models/Locale')
const Utente = require('../models/Utente')

// recuperare tutti gli eventi
exports.getAllEventi = async (req, res) => {
    try{
        const eventi = await Evento.find()
        .populate('locale', 'nome')

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
    const userData = res.userData

    if (!nome || !dataInizio)
        return res.status(400).json({ success: false, message: 'Compilare tutti i campi' })

    try{
        // creazione dell'evento
        const evento = new Evento({
            nome: nome,
            locale: userData.locale,
            descrizione: descrizione,
            dataInizio: Date.parse(dataInizio)
        })

        const newEvent = await evento.save()

        const localeOrganizzatore = await Locale.findById(userData.locale)

        // salvo l'evento negi eventi del locale
        localeOrganizzatore.eventi.push(evento)

        await localeOrganizzatore.save()

        res.status(201).json({ success: true, evento: newEvent })

    } catch(err){
        res.status(500).json({ success: false, error: err.message })
    }
}

// recuperare un evento specifico
exports.getEvento = async (req, res) => {
    try{
        const evento = await Evento.findById(req.params.eventoID)
        .populate('locale', 'nome')

        if (!evento)
            return res.status(404).json({ success: false, message: 'Nessun evento trovato' })
        
        res.status(201).json({ success: true, evento: evento })
        
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}

// aggiungere/rimuovere una prenotazione di un Utente ad un evento specifico
exports.postPrenotazione = async (req, res) => {
    // recupero dei dati di login
    const userData = res.userData

    try {
        // recupero gli oggetti dal database
        const evento = await Evento.findById(req.params.eventoID)
        const utente = await Utente.findById(userData.id)

        if (!evento || !utente)
            return res.status(500).json({ success: false, message: 'Evento o Utente insesistente' })
        
        // se l'evento a cui si sta provando a prenotare è scaduto, errore
        if (Date.parse(evento.dataInizio) < Date.now())
            return res.status(400).json({ success: false, message: 'Impossibile prenotarsi a questo evento (scaduto)' })
        
        // controllo se l'utente è già prenotato all'evento
        let prenotazioneEffettuata = false
        evento.prenotazioni.forEach((ev) => {
            if (String(ev) === userData.id)
                prenotazioneEffettuata = true
        })

        // se non lo è, lo aggiungo alle prenotazioni dell'evento e aggiungo l'evento alle prenotazioni dell'utente
        if (prenotazioneEffettuata) {
            evento.prenotazioni = evento.prenotazioni.filter(ev => String(ev) !== userData.id)
            utente.prenotazioni = utente.prenotazioni.filter(ev => String(ev) !== String(evento._id))
            
            await evento.save()
            await utente.save()

            return res.status(200).json({ success: true, message: 'Prenotazione cancellata correttamente' })
        }
        // altrimenti, tolgo
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