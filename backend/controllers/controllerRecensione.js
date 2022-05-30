const Recensione = require('../models/Recensione')
const Locale = require('../models/Locale')

exports.creaNuovaRecensione = async (req, res) => {
    try {
        const utente = req.userData

        const locale = await Locale.findById(req.body.localeID)

        if (locale) {
            const recensione = new Recensione({
                utenteID: utente.id,
                localeID: req.body.localeID,
                commento: req.body.commento,
                votazione: req.body.votazione
            })

            // logica per calcolare il ranking come media delle votazioni delle recensioni
            if (locale.ranking === 0) {
                locale.ranking = recensione.votazione
            } else {
                locale.ranking = (locale.ranking * locale.recensioni.length + recensione.votazione) / (locale.recensioni.length + 1)
            }

            locale.recensioni.push(recensione._id)
            await locale.save()

            const newRecensione = await recensione.save()

            res.status(200).json({ success: true, recensione: newRecensione })

        } else {
            res.status(300).json({ success: false, message: 'Locale invalido' })
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err })
    }
}

exports.deleteRecensione = async (req, res) => {
    try {
        await Recensione.deleteMany({})
        res.status(200).json({ success: true, message: 'Recensioni cancellate correttamente' })
    } catch (err) {
        res.status(500).json({ success: false, error: err })
    }
}