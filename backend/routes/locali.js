const express = require('express')
const router = express.Router()

const checkRole = require('../middleware/check-role')
const checkAuth = require('../middleware/check-auth')

const controllerEventi = require('../controllers/controllerEvento')
const controllerLocali = require('../controllers/controllerLocale')
const controllerRecensioni = require('../controllers/controllerRecensione')

/* @openapi
* /locali/:localeID
*  get:
*    description: Permette di visualizzare un locale specifico
*    response:
*      200: 
*        description: Ritorna le informazioni di un locale
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                success:
*                  type: boolean
                 locale: 
                   type: Locale
                 eventiPassati:
                   type: array
                   description: array di eventi già avvenuti
                 eventiFuturi
                   type: array
                   description: array di eventi che devono ancora avvenire
*/

// recuperare un locale 
router.get('/:localeID', controllerLocali.getLocale)

/* @openapi
* /locali/:localeID/eventi
*  post:
*    description: Permette al Gestore Locale di creare un evento
*    response:
*      201: 
*        description: Ritorna un messaggio di avvenuta creazione evento e l'id dell'evento
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                success:
*                  type: boolean
                 message: 
                   type: String
                 eventoID:
                   type: String
*/

// aggiungere un evento 
router.post('/:localeID/eventi', checkAuth, checkRole.checkPermessiProprietarioLocale, controllerEventi.postEvento)

/* @openapi
* /locali/:localeID/eventi/:eventoID/
*  get:
*    description: Permette di visualizzare le informazioni di un evento specifico
*    response:
*      200: 
*        description: Ritorna i dati di un evento
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                success:
*                  type: boolean
                 evento: 
                   type: Evento
*/

// informazioni relative ad un evento specifico
router.get('/:localeID/eventi/:eventoID', controllerEventi.getEvento)

/* @openapi
* /locali/:localeID/eventi/:eventoID
*  put:
*    description: Permette al Gestore Locale di modificare i dati di un evento specifio
*    response:
*      200: 
*        description: Ritorna un messaggio di conferma aggiornamento dati
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

// modifica le informazioni di un evento specifico
router.put('/:localeID/eventi/:eventoID', checkAuth, checkRole.checkPermessiProprietarioLocale, controllerEventi.modificaEvento)

/* @openapi
* /locali/:localeID/eventi/:eventoID
*  delete:
*    description: Permette al Gestore Locale di cancellare un evento specifico
*    response:
*      200: 
*        description: Ritorna un messaggio di conferma cancellazione evento
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

// eliminare un evento
router.delete('/:localeID/eventi/:eventoID', checkAuth, checkRole.checkPermessiProprietarioLocale, controllerEventi.deleteEvento)

/* @openapi
* /locali/:localeID/recensioni
*  get:
*    description: Permette di visualizzare tutte le recensioni di un locale
*    response:
*      200: 
*        description: Ritorna l'elenco di tutte le recensioni del locale
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                success:
*                  type: boolean
                 recensioni: 
                   type: array
                   description: Array di tutte le recensioni di un locale
*/

// restituisce tutte le recensioni di un locale
router.get('/:localeID/recensioni', controllerRecensioni.getAllRecensioni)

/* @openapi
* /:localeID/recensioni
*  post:
*    description: Permette a un utente di creare un commento
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

// creazione di una recensione
router.post('/:localeID/recensioni', checkAuth, controllerRecensioni.postRecensione)

/* @openapi
* /:localeID/segui
*  delete:
*    description: Permette a un utente di seguire un locale
*    response:
*      200: 
*        description: Ritorna un messaggio di conferma che si è iniziato a seguire il locale
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

// seguire un locale
router.post('/:localeID/segui', checkAuth, controllerLocali.followLocale)

/* @openapi
* /:localeID/segui
*  delete:
*    description: Permette a un utente di smettere di seguire un locale
*    response:
*      200: 
*        description: Ritorna un messaggio di conferma che ha smesso di seguire il locale
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

// non seguire più un locale
router.delete('/:localeID/segui', checkAuth, controllerLocali.unfollowLocale)

/* @openapi
* /locali/:localeID/recensioni/:recensioneID
*  delete:
*    description: Permette a un Admin o all'utente che la ha scritta di cancellare una recensione
*    response:
*      200: 
*        description: Ritorna un messaggio di conferma cancellazione recensione
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

// cancella una recensione
router.delete('/:localeID/recensioni/:recensioneID', checkAuth, checkRole.checkPermessiCreatoreRecensione, controllerRecensioni.deleteRecensione)

/* @openapi
* /:localeID/eventi/:eventoID/notifiche
*  post:
*    description: Permette al Gestore Locale di mandare una notifica a tutti gli iscritti a un evento
*    response:
*      200: 
*        description: Ritorna un messaggio di conferma invio segnalazione
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

// invio notifica ai partecipanti di un determinato evento
router.post('/:localeID/eventi/:eventoID/notifiche', checkAuth, checkRole.checkPermessiProprietarioLocale, controllerEventi.invioNotifica)

module.exports = router