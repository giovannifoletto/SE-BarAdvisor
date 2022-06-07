const app = require('../server') // Link to your server 
const request = require('supertest')
const casual = require('casual')
const mockData = require('./mockData')
const { getMaxListeners } = require('../server')

mockData.main()

let memorize = {
    user: null,
    token: null,
    locale: null,
    evento: null,
    const: 1
}

describe('Testo Locali', () => {

    beforeAll(async () => {
        const res = await request(app).post('/api/v1/auth/login').send({
            email: "localeOrganizzatore@gmail.com",
            password: '123'
        })
        console.log(res.body)

        expect(res.status).toBe(200)
    })

    test('GET /:localeID ok', async () => {
        const url = '/api/v1/eventi/' + memorize.locale.locale_ID
        const res = await request(app).get(url)
        expect(res.status).toBe(201)
    });

    test('GET /:localeID evento inesistente', async () => {
        const url = '/api/v1/locali/' + ObjectId(1) 
        const res = await request(app).get(url)
        expect(res.status).toBe(404)
        expect(res.body).toEqual({message: "Nessun locale trovato", success: false})
    })
})