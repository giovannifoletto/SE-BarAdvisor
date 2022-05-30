const express = require('express')
const router = express.Router()

const checkRole = require('../middleware/check-role')
const checkAuth = require('../middleware/check-auth')

const controllerEventi = require('../controllers/controllerEvento')
const controllerLocali = require('../controllers/controllerLocale')
const controllerRecensione = require('../controllers/controllerRecensione')

// recuperare un locale 
router.get('/:localeID', controllerLocali.getLocale)

// aggiungere un evento 
router.post('/:localeID/eventi', checkAuth, checkRole.checkOwnerLocale, controllerEventi.postEvento)

// informazioni relative ad un evento specifico
router.get('/:localeID/eventi/:eventoID', controllerEventi.getEvento)

// creazione di una recensione
router.post('/:localeID/recensione', checkAuth, controllerRecensione.creaNuovaRecensione)

// cancella una recensione
router.delete('/:localeID/recensione/:recensioneID/cancellaRecensione', checkAuth, checkRole.cancellaRecensione,controllerRecensione.deleteRecensione)

// restituisce tutte le recensioni di un locale
router.get('/:localeID/recensione', controllerLocali.getAllRecensioni)

module.exports = router