const express = require('express')
const router = express.Router()

const controllerUtenti = require('../controllers/controllerUtente')

const checkAuth = require('../middleware/check-auth')

// ottenere tutti gli utenti nel database (per development)
router.get('/utenti', controllerUtenti.getAllUtenti)

// ottenere il nome utente di un utente
router.get('/utenti/:utenteID', controllerUtenti.getNomeUtente)

// creazione di Gestore Locale e relativo Locale
router.post('/new/gestorelocale', controllerUtenti.registrazioneLocale)

// creazione di Cliente
router.post('/new/cliente', controllerUtenti.registrazioneCliente)

// login Utente
router.post('/login', controllerUtenti.loginUtente)

// password dimenticata
router.post('/passworddimenticata', controllerUtenti.passwordDimenticata)

// reset password - continua passoword dimenticata
router.put('/resetpassword/:resetToken', controllerUtenti.resetToken)

// cambio password - diverso da password dimenticata
router.put('/cambiopassword', checkAuth, controllerUtenti.changePassword)

// cancellazione utente Cliente
router.delete('/utenti/:utenteID', checkAuth, controllerUtenti.deleteAccount)

module.exports = router