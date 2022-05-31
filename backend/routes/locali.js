const express = require('express')
const router = express.Router()

const checkRole = require('../middleware/check-role')
const checkAuth = require('../middleware/check-auth')

const controllerEventi = require('../controllers/controllerEvento')
const controllerLocali = require('../controllers/controllerLocale')

// recuperare un locale 
router.get('/:localeID', controllerLocali.getLocale)

// aggiungere un evento 
router.post('/:localeID/eventi', checkAuth, checkRole.checkOwnerLocale, controllerEventi.postEvento)

// informazioni relative ad un evento specifico
router.get('/:localeID/eventi/:eventoID', controllerEventi.getEvento)

// invio di una notifica a tutti i partecipanti ad un evento
router.post('/:localeID/eventi/:eventoID/notifiche', checkAuth, checkRole.checkOwnerLocale, controllerEventi.invioNotifica)

module.exports = router