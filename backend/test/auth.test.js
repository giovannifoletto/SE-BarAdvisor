const app = require('../server') // Link to your server 
const request = require('supertest')
const mongoose = require('mongoose')
const casual = require('casual')
const mockData = require('./mockData')

describe('Test auth', () => {
    test('POST /api/v1/auth/new/cliente ok', async () => {
            
                const res = await request(app).post('/api/v1/auth/new/cliente').set('Content-Type', 'application/json').send({
                nome: mockData.state.users.nome,
                email: mockData.state.users.email,
                password: mockData.state.users.password
            })
            expect(res.status).toBe(200)}
        });

    test('GET /utenti', async () => {
        const res = await request(app).get('/api/v1/auth/utenti')
        expect(res.status).toBe(200)
    })

    test(('POST /new/cliente no password'), async () => {
                const res = await request(app).post('/api/v1/auth/new/cliente').set('Content-Type', 'application/json').send({
                nome: mockData.state.users.nome,
                email: mockData.state.users.email,
            })
            expect(res.status).toBe(400)
            expect(res.body).toEqual({message: "Compilare tutti i campi", success: false})
        });

        test(('POST /new/cliente no password'), async () => {
                    const res = await request(app).post('/api/v1/auth/new/cliente').set('Content-Type', 'application/json').send({
                    password: mockData.state.users.password,
                    email: mockData.state.users.email,
                })
                expect(res.status).toBe(400)
                expect(res.body).toEqual({message: "Compilare tutti i campi", success: false})
            });

    test(('POST /new/cliente no email'), async () => {
                const res = await request(app).post('/api/v1/auth/new/cliente').set('Content-Type', 'application/json').send({
                nome: mockData.state.users.nome,
                password: mockData.state.users.password,
            })
            expect(res.status).toBe(400)
            expect(res.body).toEqual({message: "Compilare tutti i campi", success: false})
        });

    test(('POST /new/cliente già esistente'), async () => {
                const res = await request(app).post('/api/v1/auth/new/cliente').set('Content-Type', 'application/json').send({
                nome: mockData.state.users.nome,
                email: mockData.state.users.email,
                password: mockData.state.users.password
            })
            expect(res.status).toBe(400)
            expect(res.body).toEqual({message: "Utente già esistente", success: false})
        });

    test(('POST /login ok'), async () => {
        const res = await request(app).post('/api/v1/auth/login').send({
            email: mockData.state.users.email,
            password: mockData.state.users.password
        })
        expect(res.status).toBe(200)
    });

    test(('POST /login email sbagliata'), async () => {
        const res = await request(app).post('/api/v1/auth/login').send({
            email: "pappo@gmail.com",
            password: mockData.state.users.password
        })
        expect(res.status).toBe(400)
        expect(res.body).toEqual({message: "Utente inesistente", success: false})
    });

    test(('POST /login password sbagliata'), async () => {
        const res = await request(app).post('/api/v1/auth/login').send({
            email: mockData.state.users.email,
            password: "13"
        })
        
        expect(res.status).toBe(400)
        expect(res.body).toEqual({message: "Password incorretta", success: false})
    });

    test(('POST /login email mancante'), async () => {
        const res = await request(app).post('/api/v1/auth/login').send({
            password: mockData.state.users.password
        })

        expect(res.status).toBe(400)
        expect(res.body).toEqual({message: "Compilare tutti i campi", success: false})
    });

    test(('POST /login password mancante'), async () => {
        const res = await request(app).post('/api/v1/auth/login').send({
            email: mockData.state.users.email
        })

        expect(res.status).toBe(400)
        expect(res.body).toEqual({message: "Compilare tutti i campi", success: false})
    });

    test.todo('DELETE Account Cliente')
    test.todo('DELETE Account GestoreLocale')
})


