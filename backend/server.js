const express = require('express')
const config = require('./config')
const cors = require('cors')

const app = express()

// chiamata alla funzione per la connessione con il database
const db_connection = require('./controllers/db_connection')
db_connection.connect()

const authRouter = require('./routes/autenticazione')
const localsRouter = require('./routes/locali')
const eventsRouter = require('./routes/eventi')

// middleware utili
app.use(express.json())
app.use(cors())

// gestione delle routes
app.use('/auth', authRouter)
app.use('/locali', localsRouter)
app.use('/eventi', eventsRouter)

app.use('/', express.static('static'))

app.listen(config.PORT, () => {
  console.log(`BarAdvisor-API listening on ${config.PORT}`)
})
