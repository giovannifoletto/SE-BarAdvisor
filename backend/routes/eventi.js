const express = require('express')
const router = express.Router()

const controllerEventi = require('../controllers/controllerEvento')
const controllerUploads = require('../controllers/controllerUploads')
const controllerCommenti = require('../controllers/controllerCommento')

const checkAuth = require('../middleware/check-auth')
const checkRole = require('../middleware/check-role')
const uploadImmagine = require('../middleware/uploadImmagine')

/* @openapi
* /eventi/:
*  get:
*    description: Permette di visualizzare tutti gli eventi
*    response:
*      200: 
*        description: Ritorna tutti gli eventi
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                success:
*                  type: boolean
                 eventi: 
                   type: array
                   description: array di tutti gli eventi presenti sul database
*/

// restituisce tutti gli eventi
router.get('/', controllerEventi.getAllEventi)

/* @openapi
* /eventi/:eventoID:
*  get:
*    description: Permette di visualizzare i dati un evento specifico
*    response:
*      200: 
*        description: Ritorna i dati di un evento specifico
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                success:
*                  type: boolean
                 eventi: 
                   type: Evento
*/

// restituisce un evento specifico
router.get('/:eventoID', controllerEventi.getEvento)

/* @openapi
* /eventi/:eventoID/prenotazioni:
*  post:
*    description: Permette di prenotare un posto a un evento
*    response:
*      201: 
*        description: Ritorna un messaggio di conferma prenotazione
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                success:
*                  type: boolean
                 message: 
                   type: String
*/

// aggiungere prenotazione ad un evento
router.post('/:eventoID/prenotazioni', checkAuth, controllerEventi.postPrenotazione)

/* @openapi
* /eventi/:eventoID/prenotazioni:
*  delete:
*    description: Permette di annullare la prenotazione
*    response:
*      200: 
*        description: Ritorna un messaggio di conferma avvenuta cancellazione recensione
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                success:
*                  type: boolean
                 message: 
                   type: String
*/

// togliere prenotazione ad un evento
router.delete('/:eventoID/prenotazioni', checkAuth, controllerEventi.deletePrenotazione)

/* @openapi
* /eventi/:eventoID/commenti
*  post:
*    description: Permette di creare un commento
*    response:
*      201: 
*        description: Ritorna un messaggio di conferma creazione commento
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                success:
*                  type: boolean
                 message: 
                   type: String
*/

// aggiungere un commento ad un evento
router.post('/:eventoID/commenti', checkAuth, controllerCommenti.postCommento)

/* @openapi
* /eventi/:eventoID/commenti/:commentoID
*  delete:
*    description: Permette all'utente che ha creato il commento o ad un admin di cancellare il commento
*    response:
*      200: 
*        description: Ritorna un messaggio di conferma cancellazione commento
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                success:
*                  type: boolean
                 message: 
                   type: String
*/

// cancellare un commento
router.delete('/:eventoID/commenti/:commentoID', checkAuth, checkRole.checkPermessiCreatoreCommento, controllerCommenti.deleteCommento)

/* @openapi
* /eventi/:eventoID/commenti/:commentoID
*  post:
*    description: Permette al Gestore Locale di caricare un'immagine come locandina del locale
*    response:
*      200: 
*        description: Ritorna un messaggio di conferma caricamento immagine
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                success:
*                  type: boolean
                 message: 
                   type: String
*/

// upload immagine evento
router.post('/:eventoID/copertina', uploadImmagine.single('immagine'), controllerUploads.uploadImmagine)

/* @openapi
* /eventi/:eventoID/commenti/:commentoID
*  get:
*    description: Permette di visualizzare la locandina di un locale
*    response:
*      200: 
*        description: Ritorna un messaggio di conferma cancellazione commento
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                success:
*                  type: boolean
                 imm: 
                   type: array
                   description: l'immagine viene convertita in un array buffer
*/

// get immagine evento
router.get('/:eventoID/copertina', controllerUploads.getImmagine)

module.exports = router