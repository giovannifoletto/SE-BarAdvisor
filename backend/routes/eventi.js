const express = require('express')
const router = express.Router()

const checkRole = require('../middlewares/check-role')

const eventiController = require('../controllers/controllerEvento')

// recuperare tutti gli eventi
router.get('/', eventiController.getAllEventi)

// aggiungere un evento 
router.post('/', checkRole.checkOwnerLocale, eventiController.postEvento)

// informazioni relative ad un evento specifico
router.get('/:eventoID', eventiController.getEvento)

module.exports = router