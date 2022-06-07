const app = require('../server') // Link to your server 
const request = require('supertest')
const mongoose = require('mongoose')
const casual = require('casual')
const mockData = require('./mockData')
mockData.main()

describe('Test auth', () => {
    test('POST /new/cliente ok', async () => {
        for(let i=0; i<mockData.VAL_TEST; i++)
            {   
                const res = await request(app).post('/api/v1/auth/new/cliente').set('Content-Type', 'application/json').send({
                nome: mockData.users[i].nome,
                email: mockData.users[i].email,
                password: mockData.users[i].password
            })
            expect(res.status).toBe(200)}
        });

    test('GET /utenti', async () => {
        const res = await request(app).get('/api/v1/auth/utenti')
        expect(res.status).toBe(200)
    })

    test(('POST /new/cliente no password'), async () => {
        for(let i=0; i<mockData.VAL_TEST; i++)
            {   
                const res = await request(app).post('/api/v1/auth/new/cliente').set('Content-Type', 'application/json').send({
                nome: mockData.users[i].nome,
                email: mockData.users[i].email,
            })
            expect(res.status).toBe(400)
            expect(res.body).toEqual({message: "Compilare tutti i campi", success: false})
        }
        });

        test(('POST /new/cliente no password'), async () => {
            for(let i=0; i<mockData.VAL_TEST; i++)
                {   
                    const res = await request(app).post('/api/v1/auth/new/cliente').set('Content-Type', 'application/json').send({
                    password: mockData.users[i].password,
                    email: mockData.users[i].email,
                })
                expect(res.status).toBe(400)
                expect(res.body).toEqual({message: "Compilare tutti i campi", success: false})
            }
            });

    test(('POST /new/cliente no email'), async () => {
        for(let i=0; i<mockData.VAL_TEST; i++)
            {   
                const res = await request(app).post('/api/v1/auth/new/cliente').set('Content-Type', 'application/json').send({
                nome: mockData.users[i].nome,
                password: mockData.users[i].password,
            })
            expect(res.status).toBe(400)
            expect(res.body).toEqual({message: "Compilare tutti i campi", success: false})
        }
        });

    test(('POST /new/cliente già esistente'), async () => {
        for(let i=0; i<mockData.VAL_TEST; i++)
            {   
                const res = await request(app).post('/api/v1/auth/new/cliente').set('Content-Type', 'application/json').send({
                nome: mockData.users[i].nome,
                email: "pippo@getMaxListeners.com",
                password: mockData.users[i].password
            })
            expect(res.status).toBe(400)
            expect(res.body).toEqual({message: "Utente già esistente", success: false})
        }
        });

    test(('POST /login ok'), async () => {
        const res = await request(app).post('/api/v1/auth/login').send({
            email: "pippo@gmail.com",
            password: "123"
        })
        expect(res.status).toBe(200)
    });

    test(('POST /login email sbagliata'), async () => {
        const res = await request(app).post('/api/v1/auth/login').send({
            email: "pappo@gmail.com",
            password: "123"
        })
        expect(res.status).toBe(400)
        expect(res.body).toEqual({message: "Utente inesistente", success: false})
    });

    test(('POST /login password sbagliata'), async () => {
        const res = await request(app).post('/api/v1/auth/login').send({
            email: "pippo@gmail.com",
            password: "13"
        })
        
        expect(res.status).toBe(400)
        expect(res.body).toEqual({message: "Password incorretta", success: false})
    });

    test(('POST /login email mancante'), async () => {
        const res = await request(app).post('/api/v1/auth/login').send({
            password: "123"
        })

        expect(res.status).toBe(400)
        expect(res.body).toEqual({message: "Compilare tutti i campi", success: false})
    });

    test(('POST /login password mancante'), async () => {
        const res = await request(app).post('/api/v1/auth/login').send({
            email: "pippo@gmail.com"
        })

        expect(res.status).toBe(400)
        expect(res.body).toEqual({message: "Compilare tutti i campi", success: false})
    });
})


