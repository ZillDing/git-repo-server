'use strict'
const express = require('express')

const app = require('./apiServer')

// static files
app.use(express.static(`${__dirname}/public`))
app.get('*', function(req, res) {
  res.sendFile(`${__dirname}/public/index.html`)
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
