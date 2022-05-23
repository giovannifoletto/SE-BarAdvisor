const express = require('express')
const router = express.Router()

const checkRole = require('../middleware/check-role')
const checkAuth = require('../middleware/check-auth')

const eventiController = require('../controllers/controllerEvento')

// aggiungere un evento 
router.post('/:localeID/eventi', checkAuth, checkRole.checkOwnerLocale, eventiController.postEvento)

// informazioni relative ad un evento specifico
router.get('/:localeID/eventi/:eventoID', eventiController.getEvento)

module.exports = router