const express = require('express')
const router = express.Router()

const controllerUtente = require('../controllers/controllerUtente')

// ottenere tutti gli utenti nel database (per development)
router.get('/utenti', controllerUtente.getUtenti)

// creazione di Gestore Locale e relativo Locale
router.post('/new/gestorelocale', controllerUtente.registrazioneLocale)

// creazione di Cliente
router.post('/new/cliente', controllerUtente.registrazioneCliente)

module.exports = router