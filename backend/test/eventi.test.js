const app = require('../server') // Link to your server 
const request = require('supertest')
const mockData = require('./mockData')
const Evento = require('../models/Evento')
const mongoose = require('mongoose')

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
        expect(res.body.success).toBeTruthy()
        expect(res.body.eventi).toBeDefined()
    });

    test('POST /:localeID/eventi ok', async () => {
        const res = await request(app)
            .post(`/api/v1/locali/${localState.creaUtenti.utente.locale}/eventi`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${localState.token}`)
            .send(mockData.state.evento)
        localState.evento = mockData.state.evento
        expect(res.body.message).toEqual('Nuovo evento creato correttamente')
        expect(res.body.success).toBeTruthy()
        expect(res.body.eventoID).toBeDefined()
        expect(res.status).toBe(201)
    });

    test('GET /', async () => {
        const url = '/api/v1/eventi/'
        const res = await request(app).get(url)
        expect(res.status).toBe(200)
    });

    test('POST /:localeID/eventi utente non loggato', async () => {

        const res = await request(app)
            .post(`/api/v1/locali/${localState.creaUtenti.utente.locale}/eventi`)
            .set('Content-Type', 'application/json')
            .send(mockData.state.evento)
        expect(res.body).toEqual({ success: false, message: "Utente non loggato, impossibile procedere" })
        expect(res.status).toBe(401)
    });

    // untestable 
    // Tempo perso cercando di risolvere questo testcase: 30 minuti
    // non si può risolvere perché non si può avere un evento senza un locale
    // interviene prima il middleware del controller
    // test('POST /:localeID/eventi locale inesistente', async () => {
    //     const tempEvento = {
    //         nome: mockData.state.evento.nome,
    //         descrizione: mockData.state.evento.descrizione,
    //         dataInizio: new Date(Date.now() + 100000000),
    //         posti: mockData.state.evento.posti
    //     }
    //     const res = await request(app)
    //         .post(`/api/v1/locali/507f1f77bcf86cd799439011/eventi`)
    //         .set('Content-Type', 'application/json')
    //         .set('Authorization', `Bearer ${localState.token}`)
    //         .send(tempEvento)
    //         expect(res.body).toEqual({ success: false, message: "Locale inesistente" })
    //     expect(res.status).toBe(404)
    // })

    test('POST /:localeID/eventi no nome', async () => {

        const res = await request(app)
            .post(`/api/v1/locali/${localState.creaUtenti.utente.locale}/eventi`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${localState.token}`)
            .send({
                descrizione: mockData.state.evento.descrizione,
                dataInizio: mockData.state.evento.dataInizio
            })
        expect(res.status).toBe(400)
        expect(res.body.message).toEqual('Compilare tutti i campi')
        expect(res.body.success).not.toBeTruthy()
    });

    test('POST /:localeID/eventi no descrizione', async () => {

        const res = await request(app)
            .post(`/api/v1/locali/${localState.creaUtenti.utente.locale}/eventi`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${localState.token}`)
            .send({
                nome: mockData.state.evento.nome,
                dataInizio: mockData.state.evento.dataInizio,
                posti: mockData.state.evento.posti
            })
        expect(res.body.message).toEqual('Nuovo evento creato correttamente')
        expect(res.body.success).toBeTruthy()
        expect(res.body.eventoID).toBeDefined()
        expect(res.status).toBe(201)
    });

    test('POST /:localeID/eventi no data inizio', async () => {

        const res = await request(app)
            .post(`/api/v1/locali/${localState.creaUtenti.utente.locale}/eventi`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${localState.token}`)
            .send({
                descrizione: mockData.state.evento.descrizione,
                nome: mockData.state.evento.nome
            })
        expect(res.status).toBe(400)
        expect(res.body).toEqual({ success: false, message: 'Compilare tutti i campi' })
    });

    test('GET /:eventoID ok', async () => {
        const allEvents = await request(app).get('/api/v1/eventi/')

        expect(allEvents.status).toBe(200)

        const evento = await request(app)
            .get(`/api/v1/eventi/${allEvents.body.eventi[0]._id}`)

        expect(evento.status).toBe(200)
    });

    test('GET /:eventoID evento inesistente', async () => {
        const url = '/api/v1/eventi/' + "507f1f77bcf86cd799439011"
        const res = await request(app).get(url)
        expect(res.body).toEqual({ message: "Nessun evento trovato", success: false })
        expect(res.status).toBe(404)

    })

    test('Prenotazioni POST', async () => {
        const tempEvento = {
            nome: mockData.state.evento.nome,
            descrizione: mockData.state.evento.descrizione,
            dataInizio: new Date(Date.now() + 100000000),
            posti: mockData.state.evento.posti
        }

        const nuovoEvento = await request(app)
            .post(`/api/v1/locali/${localState.creaUtenti.utente.locale}/eventi`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${localState.token}`)
            .send(tempEvento)

        const eventoID = nuovoEvento.body.eventoID
        expect(nuovoEvento.body.message).toEqual("Nuovo evento creato correttamente")
        expect(nuovoEvento.body.success).toBeTruthy()
        expect(nuovoEvento.status).toBe(201)

        const res = await request(app)
            .post(`/api/v1/eventi/${eventoID}/prenotazioni`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${localState.token}`)
        expect(res.body).toEqual({ success: true, message: 'Prenotazione effettuata correttamente' })
        expect(res.status).toBe(200)
    })
    test('Prenotazioni DELETE', async () => {
        const tempEvento = {
            nome: mockData.state.evento.nome,
            descrizione: mockData.state.evento.descrizione,
            dataInizio: new Date(Date.now() + 100000000),
            posti: mockData.state.evento.posti
        }

        const nuovoEvento = await request(app)
            .post(`/api/v1/locali/${localState.creaUtenti.utente.locale}/eventi`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${localState.token}`)
            .send(tempEvento)

        const eventoID = nuovoEvento.body.eventoID
        expect(nuovoEvento.status).toBe(201)

        const iscrizioneEvento = await request(app)
            .post(`/api/v1/eventi/${eventoID}/prenotazioni`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${localState.token}`)

        expect(iscrizioneEvento.status).toBe(200)

        const res = await request(app)
            .post(`/api/v1/locali/${localState.creaUtenti.utente.locale}/eventi/${eventoID}`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${localState.token}`)

    })
    test.todo('Invia Notifica')
})