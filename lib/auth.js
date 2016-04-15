'use strict'
const md5 = require('md5')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const user = { id: 1, username: 'zill' }

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  done(null, user)
})

passport.use(new LocalStrategy(function(username, password, done) {
  // retrieve user ...
  if (username === 'zill'&&
    md5(password) === 'db63aec362204a48a5c89578757cfacb') {
    done(null, user)
  } else {
    done(null, false)
  }
}))

module.exports.login = function login(req, res) {
  res.send(req.user)
}

module.exports.logout = function logout(req, res) {
  req.logout()
  res.status(204).end()
}

module.exports.ensureLoggedIn = function ensureLoggedIn(req, res, next) {
  if (req.user) return next()
  res.status(405).send('Unauthorized')
}

module.exports.profile = function profile(req, res) {
  res.send(req.user)
}
