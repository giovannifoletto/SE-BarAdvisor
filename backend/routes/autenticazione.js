const express = require('express')
const router = express.Router()

const controllerUtenti = require('../controllers/controllerUtente')

const checkAuth = require('../middleware/check-auth')

// ottenere tutti gli utenti nel database (per development)
/**
 * @openapi
 * /auth/utenti:
 *  get:
 *    description: Ritorna tutti gli utenti per developmente oppure per la pagina di admin.
 *    response:
 *      200: 
 *        description: Ritorna tutti gli utenti.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: booean
 *                utenti:
 *                  type: array
 *                  description: array di tutti gli utenti presenti sul database.
 */
router.get('/utenti', controllerUtenti.getAllUtenti)

// ottenere il nome utente di un utente
/**
 * @openapi
 * /auth/utenti/:utenteID:
 *  get:
 *    description: Ritorna il nome utente di un utente
 *    response:
 *      200: 
 *        description: Ritorna tutti gli utenti.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: booean
 *                utenti:
 *                  type: array
 *                  description: array di tutti gli utenti presenti sul database.
 */
router.get('/utenti/:utenteID', controllerUtenti.getNomeUtente)

/* @openapi
* /auth/new/gestorelocale:
*  post:
*    description: Crea un Gestore Locale
*    response:
*      201: 
*        description: Ritorna l'id del Locale e del suo Gestore Locale
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                success:
*                  type: boolean
*                locale:
*                  type: Locale
*                  description: Schema Locale
                 utente: 
                   type: Utente
*/

// creazione di Gestore Locale e relativo Locale
router.post('/new/gestorelocale', controllerUtenti.registrazioneLocale)

/* @openapi
* /auth/new/cliente:
*  post:
*    description: Crea un Cliente
*    response:
*      201: 
*        description: Ritorna l'id dell'utente
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                success:
*                  type: boolean
                 utente: 
                   type: Utente
*/

// creazione di Cliente
router.post('/new/cliente', controllerUtenti.registrazioneCliente)

/* @openapi
* /auth/login:
*  post:
*    description: Permette di effettuare il login
*    response:
*      200: 
*        description: Ritorna l'id dell'utente
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                success:
*                  type: boolean
                 token: 
                   type: jwt
*/

// login Utente
router.post('/login', controllerUtenti.loginUtente)


/* @openapi
* /auth/passworddimenticata:
*  post:
*    description: Permette di recuperare la password
*    response:
*      200: 
*        description: Ritorna un messaggio di conferma dell'invio della mail di recupero
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                success:
*                  type: boolean
                 messaggio: 
                   type: String
*/

// password dimenticata
router.post('/passworddimenticata', controllerUtenti.passwordDimenticata)

/* @openapi
* /auth/resetpassword/:resetToken:
*  put:
*    description: Permette di generare un token per modificare la password
*    response:
*      200: 
*        description: Ritorna un messaggio di conferma cambio password
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

// reset password - continua passoword dimenticata
router.put('/resetpassword/:resetToken', controllerUtenti.resetToken)

/* @openapi
* /auth/cambiopassword:
*  put:
*    description: Permette di cambiare la password
*    response:
*      200: 
*        description: Ritorna un messaggio di conferma cambio password
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

// cambio password - diverso da password dimenticata
router.put('/cambiopassword', checkAuth, controllerUtenti.changePassword)

/* @openapi
* /auth/cambiopassword:
*  delete:
*    description: Permette di eliminare il proprio profilo utente
*    response:
*      200: 
*        description: Ritorna un messaggio di conferma cancellazione account
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

// cancellazione utente Cliente
router.delete('/utenti/:utenteID', checkAuth, controllerUtenti.deleteAccount)

module.exports = router