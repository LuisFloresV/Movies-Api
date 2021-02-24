const express = require('express')
const app = express()

const config = require('./config/index')

app.get('/', function (req, res, next) {
  res.send('Hello World')
})

app.get('/json', function (req, res, next) {
  res.json({ hello: "world" })
})

app.listen(config.port, () => {
  console.log(`Escuchando en el puerto ${config.port}`)
})