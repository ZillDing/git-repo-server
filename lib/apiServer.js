'use strict'
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()

const repos = require('./repos')

app.use(morgan('tiny'))
app.use(bodyParser.json()) // parsing application/json

app.get('/api/repos', repos.all)
app.get('/api/repos/:id', repos.fetch)
app.post('/api/repos', repos.add)
app.delete('/api/repos/:id', repos.remove)

module.exports = app
