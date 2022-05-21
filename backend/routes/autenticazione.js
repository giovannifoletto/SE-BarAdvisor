const express = require('express')
const router = express.Router()

const controllerUtente = require('../controllers/controllerUtente')

// creazione di Gestore Locale e relativo Locale
router.post('/new/gestorelocale', controllerUtente.registrazioneLocale)

// creazione di Cliente
router.post('/new/cliente', controllerUtente.registrazioneCliente)

module.exports = router