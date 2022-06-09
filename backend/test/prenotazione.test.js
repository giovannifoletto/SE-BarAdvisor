const app = require('../server') // Link to your server 
const request = require('supertest')
const mockData = require('./mockData')
const Evento = require('../models/Evento')
const mongoose = require('mongoose')
const { JsonWebTokenError } = require('jsonwebtoken')

const localState = {
    user: null,
    token: null,
    creaUtenti: null,
    evento: null,
    allEventi: [],
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
    jest.setTimeout(1000*60*5)
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

        const allEventi = await request(app).get('/api/v1/eventi')

        localState.allEventi.concat(allEventi.eventi)

        expect(allEventi.status).toBe(200)
    })

    test('POST /evento/:eventoID/prenotazioni', async () => {

        const creaEventoValido =  await request(app)
            .post(`/api/v1/locali/${localState.creaUtenti.utente.locale}/eventi`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${localState.token}`)
            .send({
                // posti: mockData.state.evento.posti,
                descrizione: mockData.state.evento.descrizione,
                dataInizio: new Date(Date.now()+10000),
                nome: mockData.state.evento.nome
            })
        expect(creaEventoValido.body).toEqual({})
        expect(creaEventoValido.body.message).toEqual('Nuovo evento creato correttamente')
        expect(creaEventoValido.body.success).toBeTruthy()
        expect(creaEventoValido.status).toBe(201)

        const res = await request(app)
            .post(`/api/v1/eventi/${creaEventoValido.eventoID}/prenotazioni`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${localState.token}`)
        expect(res.body.message).toEqual('Nuovo evento creato correttamente')
        expect(res.body.success).toBeTruthy()
        expect(res.body.eventoID).toBeDefined()
        expect(res.status).toBe(201)
    });

})