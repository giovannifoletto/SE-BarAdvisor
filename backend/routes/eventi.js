const express = require('express')
const router = express.Router()

const controllerEvento = require('../controllers/controllerEvento')

//restituisce tutti gli eventi
router.get('/',controllerEvento.getAllEventi)



module.exports = router