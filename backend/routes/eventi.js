const express = require('express')
const router = express.Router()

const controllerEvento = require('../controllers/controllerEvento')

//restituisce tutti gli eventi
router.get('/', controllerEvento.getAllEventi)

// restituisce un evento specifico
router.get('/:eventoID', controllerEvento.getEvento)


module.exports = router