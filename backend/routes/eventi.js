const express = require('express')
const router = express.Router()

const controllerEventi = require('../controllers/controllerEvento')
const controllerUploads = require('../controllers/controllerUploads')
const controllerCommenti = require('../controllers/controllerCommento')

const checkAuth = require('../middleware/check-auth')
const checkRole = require('../middleware/check-role')
const uploadImmagine = require('../middleware/uploadImmagine')

// restituisce tutti gli eventi
router.get('/', controllerEventi.getAllEventi)

// restituisce un evento specifico
router.get('/:eventoID', controllerEventi.getEvento)

// aggiungere prenotazione ad un evento
router.post('/:eventoID/prenotazioni', checkAuth, controllerEventi.postPrenotazione)

// togliere prenotazione ad un evento
router.delete('/:eventoID/prenotazioni', checkAuth, controllerEventi.deletePrenotazione)

// aggiungere un commento ad un evento
router.post('/:eventoID/commenti', checkAuth, controllerCommenti.postCommento)

// cancellare un commento
router.delete('/:eventoID/commenti/:commentoID', checkAuth, checkRole.checkPermessiCreatoreCommento, controllerCommenti.deleteCommento)

// upload immagine evento
router.post('/:eventoID/copertina', uploadImmagine.single('immagine'), controllerUploads.uploadImmagine)

// get immagine evento
router.get('/:eventoID/copertina', controllerUploads.getImmagine)

module.exports = router