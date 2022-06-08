const express = require('express')
const router = express.Router()

const checkRole = require('../middleware/check-role')
const checkAuth = require('../middleware/check-auth')

const controllerEventi = require('../controllers/controllerEvento')
const controllerLocali = require('../controllers/controllerLocale')
const controllerRecensioni = require('../controllers/controllerRecensione')

// recuperare un locale 
router.get('/:localeID', controllerLocali.getLocale)

// aggiungere un evento 
router.post('/:localeID/eventi', checkAuth, checkRole.checkPermessiProprietarioLocale, controllerEventi.postEvento)

// informazioni relative ad un evento specifico
router.get('/:localeID/eventi/:eventoID', controllerEventi.getEvento)

// modifica le informazioni di un evento specifico
router.put('/:localeID/eventi/:eventoID', checkAuth, checkRole.checkPermessiProprietarioLocale, controllerEventi.modificaEvento)

// eliminare un evento
router.delete('/:localeID/eventi/:eventoID', checkAuth, checkRole.checkPermessiProprietarioLocale, controllerEventi.deleteEvento)

// restituisce tutte le recensioni di un locale
router.get('/:localeID/recensioni', controllerRecensioni.getAllRecensioni)

// creazione di una recensione
router.post('/:localeID/recensioni', checkAuth, controllerRecensioni.postRecensione)

// seguire un locale
router.post('/:localeID/segui', checkAuth, controllerLocali.followLocale)

// non seguire più un locale
router.delete('/:localeID/segui', checkAuth, controllerLocali.unfollowLocale)

// cancella una recensione
router.delete('/:localeID/recensioni/:recensioneID', checkAuth, checkRole.checkPermessiCreatoreRecensione, controllerRecensioni.deleteRecensione)

// invio notifica ai partecipanti di un determinato evento
router.post('/:localeID/eventi/:eventoID/notifiche', checkAuth, checkRole.checkPermessiProprietarioLocale, controllerEventi.invioNotifica)

module.exports = router