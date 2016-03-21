'use strict'
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')

const app = express()

const repos = require('./repos')

app.use(morgan('tiny'))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))

const auth = require('./auth')
app.use(passport.initialize())
app.use(passport.session())

app.post('/api/login', passport.authenticate('local'), auth.login)
app.get('/api/logout', auth.logout)
app.get('/api/profile', auth.ensureLoggedIn, auth.profile)

app.get('/api/repos', repos.all)
app.get('/api/repos/:id', repos.fetch)
app.post('/api/repos', auth.ensureLoggedIn, repos.add)
app.delete('/api/repos/:id', auth.ensureLoggedIn, repos.remove)

module.exports = app
