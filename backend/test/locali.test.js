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

describe('Testo Locali', () => {

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

    test('GET /:localeID ok', async () => {
        {
            const locale = await request(app).get(`/api/v1/locali/${localState.creaUtenti.utente.locale}`)

            expect(locale.status).toBe(200)
        }
    });

    test('GET /:localeID locale inesistente', async () => {
        const url = '/api/v1/locali/' + "507f1f77bcf86cd799439011"
        const res = await request(app).get(url)
        expect(res.status).toBe(404)
        expect(res.body).toEqual({ message: "Locale non trovato", success: false })
    })

    test('POST /:localeID/recensioni ok', async () => {
        url = `/api/v1/locali/${localState.creaUtenti.utente.locale}/recensioni`
        const res = await request(app)
            .post(url)
            .set('Authorization', `Bearer ${localState.token}`)
            .send({
                commento: mockData.state.gestoreLocale.nomeLocale,
                votazione: "5"
            })
        expect(res.body).toEqual({ success: true, message: 'Recensione creata correttamente' })
        expect(res.status).toBe(201)
    })

    test('POST /:localeID/recensioni no locale', async () => {
        url = `/api/v1/locali/507f1f77bcf86cd799439011/recensioni`
        const res = await request(app)
            .post(url)
            .set('Authorization', `Bearer ${localState.token}`)
            .send({
                commento: mockData.state.gestoreLocale.nomeLocale,
                votazione: "5"
            })
        expect(res.body).toEqual({ success: false, message: 'Locale invalido' })
        expect(res.status).toBe(404)
    })

    test('POST /:localeID/recensioni no votazione', async () => {
        url = `/api/v1/locali/${localState.creaUtenti.utente.locale}/recensioni`
        const res = await request(app)
            .post(url)
            .set('Authorization', `Bearer ${localState.token}`)
            .send({
                commento: mockData.state.gestoreLocale.nomeLocale,
            })
        expect(res.body).toEqual({ success: false, message: 'Compilare tutti i campi' })
        expect(res.status).toBe(400)
    })

    test('POST /:localeID/recensioni no commento', async () => {
        url = `/api/v1/locali/${localState.creaUtenti.utente.locale}/recensioni`
        const res = await request(app)
            .post(url)
            .set('Authorization', `Bearer ${localState.token}`)
            .send({
                votazione: "5"
            })
        expect(res.body).toEqual({ success: false, message: 'Compilare tutti i campi' })
        expect(res.status).toBe(400)
    })

    test('GET /:localeID/recensioni ok', async () => {
        url = `/api/v1/locali/${localState.creaUtenti.utente.locale}/recensioni`
        const res = await request(app)
            .get(url)
        expect(res.status).toBe(200)
    })

    test('GET /:localeID/recensioni no locale', async () => {
        url = `/api/v1/locali/507f1f77bcf86cd799439011/recensioni`
        const res = await request(app)
            .get(url)
        expect(res.status).toBe(404)
        expect(res.body).toEqual({ success: false, message: 'Locale non valido' })
    })

    test('DELETE /:localeID/recensioni/:recensioneID ok', async () => {
        const rec = await request(app)
            .get(`/api/v1/locali/${localState.creaUtenti.utente.locale}/recensioni`)

        expect(rec.status).toBe(200)

        const recensioneByUtente = rec.body.recensioni.filter(ev => ev.utente === localState.creaUtenti.utente._id)

        url = `/api/v1/locali/${localState.creaUtenti.utente.locale}/recensioni/${recensioneByUtente[0]._id}`
        const res = await request(app)
            .delete(url)
            .set('Authorization', `Bearer ${localState.token}`)
        expect(res.body).toEqual({ success: true, message: 'Recensione cancellata correttamente' })
        expect(res.status).toBe(200)
    })
})