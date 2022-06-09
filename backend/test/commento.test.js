const app = require('../server') // Link to your server 
const request = require('supertest')
const mongoose = require('mongoose')
const casual = require('casual')
const mockData = require('./mockData')

const localState = {
    user: null,
    token: null,
    creaUtenti: null,
    evento: null
}

describe('Test comments', () => {
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

        const res = await request(app)
            .post(`/api/v1/locali/${localState.creaUtenti.utente.locale}/eventi`)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${localState.token}`)
            .send(mockData.state.evento)
        localState.evento = res.body.eventoID
        expect(res.status).toBe(201)
    });
    test('POST commento', async () => {
        url = `/api/v1/eventi/${localState.evento}/commenti`
        const res = await request(app)
            .post(url)
            .set('Authorization', `Bearer ${localState.token}`)
            .send({
                commento: mockData.state.gestoreLocale.nomeLocale,
            })
            expect(res.body).toEqual({ success: true, message: 'Commento creato correttamente' })
            expect(res.status).toBe(201)
    });
    test('POST commento senza campi', async () => {
        url = `/api/v1/eventi/${localState.evento}/commenti`
        const res = await request(app)
            .post(url)
            .set('Authorization', `Bearer ${localState.token}`)
            expect(res.body).toEqual({ success: false, message: 'Compilare tutti i campi' })
            expect(res.status).toBe(400)
    });    
    test('POST commento a evento inesistente', async () => {
        url = `/api/v1/eventi/507f1f77bcf86cd799439011/commenti`
        const res = await request(app)
            .post(url)
            .set('Authorization', `Bearer ${localState.token}`)
            .send({
                commento: mockData.state.gestoreLocale.nomeLocale,
            })
            expect(res.body).toEqual({ success: false, message: 'Compilare tutti i campi' })
            expect(res.status).toBe(400)
    });
    test('DELETE commento evento inesistente', async () => {
        url = `/api/v1/eventi/507f1f77bcf86cd799439011/commenti/507f1f77bcf86cd799439011`
        const res = await request(app)
            .delete(url)
            .set('Authorization', `Bearer ${localState.token}`)
            .send({
                commento: mockData.state.gestoreLocale.nomeLocale,
            })
            expect(res.body).toEqual({ success: false, message: 'Compilare tutti i campi' })
            expect(res.status).toBe(400)
    });
})