const app = require('../server') // Link to your server 
const request = require('supertest')
const mongoose = require('mongoose')
const casual = require('casual')
const mockData = require('./mockData')
const { getMaxListeners } = require('../server')
const Locale = require('../models/Locale')
const Utente = require('../models/Utente')
const { header } = require('express/lib/request')
const Evento = require('../models/Evento')
const { application } = require('express')
const { ObjectId } = require('mongodb')
mockData.main()

let memorize = {
    user: null,
    token: null,
    locale: null,
    evento: null,
    const: 1
}

describe('Test eventi', () => {
        test('GET / ok', async () => {
            const url = '/api/v1/eventi/'
            const res = await request(app).get(url)
            expect(res.status).toBe(200)
            }
        );

        beforeAll(async () => {
            const res = await request(app).post('/api/v1/auth/login').send({
                email: "localeOrganizzatore@gmail.com",
                password: '123'
            })
            memorize.user = await Utente.findOne({email: "localeOrganizzatore@gmail.com"}).populate('locale')
            memorize.token = res.body.token
            memorize.locale = memorize.user.locale

            expect(res.status).toBe(200)
        })

        test('POST /:localeID/eventi ok', async () => {

            const url = '/api/v1/locali/' + memorize.locale.localeID + '/eventi'
            console.log('Token in test: ',memorize.token)
            const res = await (await request(app)
            .post(url)
            .set('Content-Type', 'application/json')
            .set('Authorization', 'Bearer ' + memorize.token)
            .send({
                nome: mockData.users[0].nome,
                descrizione: mockData.users[1].nome,
                dataInizio: "11/12/22"
            }))
            console.log(res.body)
            memorize.evento=await Evento.findById(res.eventoID)
            expect(res.status).toBe(200)
            expect(res.body).toBe({message: "Nuovo evento creato correttamente", success: true})
        });

        test('POST /:localeID/eventi utente non loggato', async () => {

            const url = '/api/v1/locali/' + memorize.locale.localeID + '/eventi'
            const res = await (await request(app).post(url).set("Authorization", 'Bearer ' + 123).send({
                nome: mockData.users[0].nome,
                descrizione: mockData.users[1].nome,
                dataInizio: "11/12/22"
            }))
            memorize.evento=await Evento.findById(res.eventoID)
            expect(res.status).toBe(400)
            expect(res.body).toEqual({ success: false, message: "Utente non loggato, impossibile procedere" })
        });

        // test('POST /:localeID/eventi locale inesistente', async () => {

        //     const url = '/api/v1/locali/' + 1 + '/eventi'
        //     const res = await (await request(app).post(url).set("Authorization", ': Bearer ' + memorize.token).send({
        //         nome: mockData.users[0].nome,
        //         descrizione: mockData.users[1].nome,
        //         dataInizio: "11/12/22"
        //     }))
        //     memorize.evento=await Evento.findById(res.eventoID)
        //     expect(res.status).toBe(400)
        //     expect(res.body).toBe({message: "Locale inesistente", success: false})
        // });

        // test('POST /:localeID/eventi no nome', async () => {

        //     const url = '/api/v1/locali/' + memorize.locale.localeID + '/eventi'
        //     const res = await (await request(app).post(url).set("Authorization", ': Bearer ' + memorize.token).send({
        //         descrizione: mockData.users[1].nome,
        //         dataInizio: "11/12/22"
        //     }))
        //     memorize.evento=await Evento.findById(res.eventoID)
        //     expect(res.status).toBe(400)
        //     expect(res.body).toBe({ success: false, message: 'Compilare tutti i campi' })
        // });

        // test('POST /:localeID/eventi no descrizione', async () => {

        //     const url = '/api/v1/locali/' + memorize.locale.localeID + '/eventi'
        //     const res = await (await request(app).post(url).set("Authorization", ': Bearer ' + memorize.token).send({
        //         nome: mockData.users[0].nome,
        //         dataInizio: "11/12/22"
        //     }))
        //     memorize.evento=await Evento.findById(res.eventoID)
        //     expect(res.status).toBe(200)
        //     expect(res.body).toBe({message: "Nuovo evento creato correttamente", success: true})
        // });

        // test('POST /:localeID/eventi no data inizio', async () => {

        //     const url = '/api/v1/locali/' + memorize.locale.localeID + '/eventi'
        //     const res = await (await request(app).post(url).set("Authorization", ': Bearer ' + memorize.token).send({
        //         descrizione: mockData.users[1].nome,
        //         nome: mockData.users[0].nome
        //     }))
        //     memorize.evento=await Evento.findById(res.eventoID)
        //     expect(res.status).toBe(400)
        //     expect(res.body).toBe({ success: false, message: 'Compilare tutti i campi' })
        // });

        test('GET /:eventoID ok', async () => {
            const url = '/api/v1/eventi/' + memorize.evento.evento_ID
            const res = await(await request(app).get(url))
            expect(res.status).toBe(201)
        });

        test('GET /:eventoID evento inesistente', async () => {
            const url = '/api/v1/eventi/' + ObjectId(1) 
            const res = await(await request(app).get(url))
            expect(res.status).toBe(404)
            expect(res.body).toEqual({message: "Nessun evento trovato", success: false})
        })

        

})