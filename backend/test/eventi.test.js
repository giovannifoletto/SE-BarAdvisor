const app = require('../server') // Link to your server 
const request = require('supertest')
const mockData = require('./mockData')
const Evento = require('../models/Evento')

const localState = {
    user: null, 
    token: null,
    creaUtenti: null,
    evento: null
}

/**
 *     {
      success: true,
      utente: {
        nome: 'Keagan_Smitham',
        email: 'Marks_Noemie@yahoo.com',
        password: '$2b$10$.m3c1PtzTPwCRf4mYDTlh.3UdEIPt2toqGCSL7DJ.Drz22sybA7M.',
        ruolo: 'GestoreLocale',
        prenotazioni: [],
        notifiche: [],
        _id: '629f5a20823f7bdeba2e1330',
        locale: '629f5a20823f7bdeba2e1331'
      },
      locale: {
        nome: 'Mosciski PLC',
        gestore: '629f5a20823f7bdeba2e1330',
        posizione: '4965 Vella Mount Apt. 071\nFlatleyview, CA 87881-8391',
        eventi: [],
        recensioni: [],
        ranking: 0,
        _id: '629f5a20823f7bdeba2e1331'
      }
    }

 */

describe('Test eventi', () => {
    beforeAll(async () => {
        const creaUtente = 
            await request(app)
            .post('/api/v1/auth/new/gestorelocale')
            .send({
                nome: mockData.state.gestoreLocale.nome,
                email: mockData.state.gestoreLocale.email,       
                password: mockData.state.gestoreLocale.password,
                nomeLocale: mockData.state.gestoreLocale.nomeLocale,
                posizione: mockData.state.gestoreLocale.posizione
            })
        localState.creaUtenti = creaUtente.body
        expect(creaUtente.status).toBe(200)

        const utente = await request(app).post('/api/v1/auth/login').send({
            email: mockData.state.gestoreLocale.email,
            password: mockData.state.gestoreLocale.password
        })

        localState.token = utente.body.token
        localState.user = utente.body.user

        expect(utente.status).toBe(200)
    })

    test('GET /', async () => {
        const url = '/api/v1/eventi/'
        const res = await request(app).get(url)
        expect(res.status).toBe(200)
    });    

    test('POST /:localeID/eventi', async () => {
        const res = await request(app)
            .post(`/api/v1/locali/${localState.creaUtenti.utente.locale}/eventi`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${localState.token}`)
            .send(mockData.state.evento)
        localState.evento=mockData.state.evento
        expect(res.status).toBe(201)
        expect(res.body).toEqual({ message: "Nuovo evento creato correttamente", success: true })
    });

    test('POST /:localeID/eventi utente non loggato', async () => {

        const url = '/api/v1/locali/' + localState.creaUtenti.utente.localeID + '/eventi'
        const res = await request(app).post(url).set("Authorization", 'Bearer ' + 123).send({
            nome: mockData.users[0].nome,
            descrizione: mockData.user[1].nome,
            dataInizio: "11/12/22"
        })
        expect(res.status).toBe(400)
        expect(res.body).toEqual({ success: false, message: "Utente non loggato, impossibile procedere" })
    });

    test('POST /:localeID/eventi locale inesistente', async () => {

        const url = '/api/v1/locali/' + 1 + '/eventi'
        const res = await (await request(app).post(url).set("Authorization", ': Bearer ' + localState.token).send({
            nome: mockData.user[0].nome,
            descrizione: mockData.user[1].nome,
            dataInizio: "11/12/22"
        }))
        memorize.evento=await Evento.findById(res.eventoID)
        expect(res.status).toBe(400)
        expect(res.body).toBe({message: "Locale inesistente", success: false})
    });

    test('POST /:localeID/eventi no nome', async () => {

        const url = '/api/v1/locali/' + localState.creaUtenti.utente.localeID + '/eventi'
        const res = await (await request(app).post(url).set("Authorization", ': Bearer ' + localState.token).send({
            descrizione: mockData.user[1].nome,
            dataInizio: "11/12/22"
        }))
        memorize.evento=await Evento.findById(res.eventoID)
        expect(res.status).toBe(400)
        expect(res.body).toBe({ success: false, message: 'Compilare tutti i campi' })
    });

    test('POST /:localeID/eventi no descrizione', async () => {

        const url = '/api/v1/locali/' + localState.creaUtenti.utente.localeID + '/eventi'
        const res = await (await request(app).post(url).set("Authorization", ': Bearer ' + localState.token).send({
            nome: mockData.user[0].nome,
            dataInizio: "11/12/22"
        }))
        memorize.evento=await Evento.findById(res.eventoID)
        expect(res.status).toBe(200)
        expect(res.body).toBe({message: "Nuovo evento creato correttamente", success: true})
    });

    test('POST /:localeID/eventi no data inizio', async () => {

        const url = '/api/v1/locali/' + localState.creaUtenti.utente.localeID + '/eventi'
        const res = await (await request(app).post(url).set("Authorization", ': Bearer ' + localState.token).send({
            descrizione: mockData.user[1].nome,
            nome: mockData.user[0].nome
        }))
        memorize.evento=await Evento.findById(res.eventoID)
        expect(res.status).toBe(400)
        expect(res.body).toBe({ success: false, message: 'Compilare tutti i campi' })
    });

    test('GET /:eventoID ok', async () => {
        const url = '/api/v1/eventi/' + localState.evento.eventoID
        const res = await (await request(app).get(url))
        expect(res.status).toBe(201)
    });

    test('GET /:eventoID evento inesistente', async () => {
        const url = '/api/v1/eventi/' + "1234567890abcdefghijklmno" 
        const res = await (await request(app).get(url))
        console.log(res.body)
        expect(res.status).toBe(404)
        expect(res.body).toEqual({ message: "Nessun evento trovato", success: false })
    })



})