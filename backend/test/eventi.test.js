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
        expect(res.status).toBe(404)

    });    

    test('POST /:localeID/eventi ok', async () => {
        const res = await request(app)
            .post(`/api/v1/locali/${localState.creaUtenti.utente.locale}/eventi`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${localState.token}`)
            .send(mockData.state.evento)
        localState.evento=mockData.state.evento
        expect(res.body).toEqual({ message: "Nuovo evento creato correttamente", success: true })
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
            .set('Authorization', `Bearer` + null)
            .send(mockData.state.evento)
        expect(res.status).toBe(401)
        expect(res.body).toEqual({ success: false, message: "Utente non loggato, impossibile procedere" })
    });

    test('POST /:localeID/eventi locale inesistente', async () => {

        const res = await request(app)
            .post("/api/v1/locali/" + "1234567890abcdefghijklmn" + "/eventi")
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${localState.token}`)
            .send(mockData.state.evento)
        console.log(res.body)
        expect(res.body).toBe({message: "Locale inesistente", success: false})
        expect(res.status).toBe(404)
    });

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
        expect(res.body).toEqual({ success: false, message: 'Compilare tutti i campi' })
    });

    test('POST /:localeID/eventi no descrizione', async () => {

        const res = await request(app)            
            .post(`/api/v1/locali/${localState.creaUtenti.utente.locale}/eventi`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${localState.token}`)
            .send({                
                nome: mockData.state.evento.nome,
                dataInizio: mockData.state.evento.dataInizio
            })
        expect(res.status).toBe(201)
        expect(res.body).toEqual({message: "Nuovo evento creato correttamente", success: true})
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
        const url = '/api/v1/eventi/' + localState.evento.eventoID
        const res = await request(app).get(url)
        console.log(res.body)
        expect(res.status).toBe(200)
    });

    test('GET /:eventoID evento inesistente', async () => {
        const url = '/api/v1/eventi/' + "507f1f77bcf86cd799439011" 
        const res = await request(app).get(url)
        console.log(res.body)
        expect(res.body).toEqual({ message: "Nessun evento trovato", success: false })
        expect(res.status).toBe(404)

    })



})