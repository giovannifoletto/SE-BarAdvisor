
const express = require('express')
const config = require('./config')
const app = express()


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(config.PORT, () => {
  console.log(`BarAdvisor-API listening on ${config.PORT}`)
})
