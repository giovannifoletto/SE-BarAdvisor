const express = require('express')
const router = express.Router()

const controllerEvento = require('../controllers/controllerEvento')

const checkAuth = require('../middleware/check-auth')

// restituisce tutti gli eventi
router.get('/',controllerEvento.getAllEventi)

// aggiungere/togliere prenotazione ad un evento
router.post('/:eventoID/prenotazione', checkAuth, controllerEvento.postPrenotazione)


module.exports = router