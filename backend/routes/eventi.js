const express = require('express')
const router = express.Router()

const controllerEventi = require('../controllers/controllerEvento')

const checkAuth = require('../middleware/check-auth')

// restituisce tutti gli eventi
router.get('/', controllerEventi.getAllEventi)

// restituisce un evento specifico
router.get('/:eventoID', controllerEventi.getEvento)

// aggiungere/ prenotazione ad un evento
router.post('/:eventoID/prenotazioni', checkAuth, controllerEventi.postPrenotazione)

// togliere prenotazione ad un evento
router.delete('/:eventoID/prenotazioni', checkAuth, controllerEventi.deletePrenotazione)

module.exports = router