const Evento = require('../models/Evento')
const Locale = require('../models/Locale')

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