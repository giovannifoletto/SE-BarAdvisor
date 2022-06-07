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
 *    responses:
 *      200: 
 *        description: Ritorna tutti gli utenti.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                utenti:
 *                  type: array
 *                  description: array di tutti gli utenti presenti sul database.
 *      500:
 *        description: Ritorna un errore.
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success: 
 *                  type: boolean
 *                error:
 *                  type: string
 *                          
 */
router.get('/utenti', controllerUtenti.getAllUtenti)

/**
 * @swagger
 * /:
 *  get:
 *    description: Ritorna il nome utente di un utente
 *    responses:
 *      200: 
 *        description: Ritorna tutti gli utenti.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                utenti:
 *                  type: array
 *                  description: array di tutti gli utenti presenti sul database.
 *      
 */
router.get('/utenti/:utenteID', controllerUtenti.getNomeUtente)

// creazione di Gestore Locale e relativo Locale
router.post('/new/gestorelocale', controllerUtenti.registrazioneLocale)

// creazione di Cliente
router.post('/new/cliente', controllerUtenti.registrazioneCliente)

// login Utente
router.post('/login', controllerUtenti.loginUtente)

// password dimenticata
router.post('/passworddimenticata', controllerUtenti.passwordDimenticata)

// reset password - continua passoword dimenticata
router.put('/resetpassword/:resetToken', controllerUtenti.resetToken)

// cambio password - diverso da password dimenticata
router.put('/cambiopassword', checkAuth, controllerUtenti.changePassword)

module.exports = router