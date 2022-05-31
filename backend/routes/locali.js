const express = require('express')
const router = express.Router()

const checkRole = require('../middleware/check-role')
const checkAuth = require('../middleware/check-auth')

const controllerEventi = require('../controllers/controllerEvento')
const controllerLocali = require('../controllers/controllerLocale')
const controllerRecensioni = require('../controllers/controllerRecensione')

// recuperare un locale 
router.get('/:localeID', controllerLocali.getLocale)

// aggiungere un evento 
router.post('/:localeID/eventi', checkAuth, checkRole.checkPermessiProprietarioLocale, controllerEventi.postEvento)

// informazioni relative ad un evento specifico
router.get('/:localeID/eventi/:eventoID', controllerEventi.getEvento)

// restituisce tutte le recensioni di un locale
router.get('/:localeID/recensioni', controllerRecensioni.getAllRecensioni)

// creazione di una recensione
router.post('/:localeID/recensioni', checkAuth, controllerRecensioni.postRecensione)

// cancella una recensione
router.delete('/:localeID/recensioni/:recensioneID', checkAuth, checkRole.checkPermessiCreatoreRecensione, controllerRecensioni.deleteRecensione)

module.exports = router