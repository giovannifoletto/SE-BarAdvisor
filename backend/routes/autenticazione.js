const express = require('express')
const router = express.Router()

const controllerUtente = require('../controllers/controllerUtente')
const auth = require('../middleware/check-auth')

// ottenere tutti gli utenti nel database (per development)
router.get('/utenti', controllerUtente.getUtenti)

// creazione di Gestore Locale e relativo Locale
router.post('/new/gestorelocale', controllerUtente.registrazioneLocale)

// creazione di Cliente
router.post('/new/cliente', controllerUtente.registrazioneCliente)

// login Utente
router.post('/login', controllerUtente.loginUtente)

// password dimenticata
router.post('/passworddimenticata', controllerUtente.passwordDimenticata)

// reset password - continua passoword dimenticata
router.put('/resetpassword/:resetToken', controllerUtente.resetToken)

// cambio password - diverso da password dimenticata
router.put('/cambioPassword', auth, controllerUtente.changePassword)

module.exports = router