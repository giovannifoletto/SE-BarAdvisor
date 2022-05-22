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
    const { nome, locale, descrizione, dataInizio } = req.body

    if (!nome || !locale || !dataInizio)
        return res.status(400).json({ success: false, message: 'Fornire tutti i campi' })

    try{
        const evento = new Evento({
            nome: nome,
            locale: locale,
            descrizione: descrizione,
            dataInizio: Date.parse(dataInizio)
        })

        const newEvent = await evento.save()

        const localeOrganizzatore = await Locale.findById(locale)

        // salvo l'evento nei prossimi eventi del locale
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

        if (evento)
            res.status(201).json({ success: true, evento: evento })
        else
            res.status(404).json({ success: false, message: 'Nessun evento trovato' })
    }
    catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
}