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

    test.todo('POST Immagine', () => {
        
    })
    test.todo('GET immagine', () => {

    })
});