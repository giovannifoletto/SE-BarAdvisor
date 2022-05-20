
const express = require('express')
const config = require('./config')

const app = express()

// chiamata alla funzione per la connessione con il database
const db_connection = require('./controllers/db_connection')
db_connection.connect()


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(config.PORT, () => {
  console.log(`BarAdvisor-API listening on ${config.PORT}`)
})
