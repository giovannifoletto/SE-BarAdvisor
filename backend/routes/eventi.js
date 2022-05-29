const express = require('express')
const router = express.Router()

const controllerEvento = require('../controllers/controllerEvento')

const checkAuth = require('../middleware/check-auth')
const checkRole = require('../middleware/check-role')

// restituisce tutti gli eventi
router.get('/', controllerEvento.getAllEventi)

// restituisce un evento specifico
router.get('/:eventoID', controllerEvento.getEvento)

// aggiungere/ prenotazione ad un evento
router.post('/:eventoID/prenotazioni', checkAuth, controllerEvento.postPrenotazione)

// togliere prenotazione ad un evento
router.delete('/:eventoID/prenotazioni', checkAuth, controllerEvento.deletePrenotazione)

module.exports = router