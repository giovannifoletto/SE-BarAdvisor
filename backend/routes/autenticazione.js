const express = require('express')
const router = express.Router()

const controllerUtenti = require('../controllers/controllerUtente')

const checkAuth = require('../middleware/check-auth')


router.get('/utenti', controllerUtenti.getAllUtenti)

router.get('/utenti/:utenteID', controllerUtenti.getNomeUtente)

router.post('/new/gestorelocale', controllerUtenti.registrazioneLocale)

router.post('/new/cliente', controllerUtenti.registrazioneCliente)

router.post('/login', controllerUtenti.loginUtente)

router.post('/passworddimenticata', controllerUtenti.passwordDimenticata)

router.put('/resetpassword/:resetToken', controllerUtenti.resetToken)

router.put('/cambiopassword', checkAuth, controllerUtenti.changePassword)

router.delete('/utenti/:utenteID', checkAuth, controllerUtenti.deleteAccount)

module.exports = router