'use strict'
const Git = require('nodegit')
const path = require('path')

module.exports = function (repoPath) {
  const pathToRepo = path.resolve(repoPath)
  const isBare = 1
  return Git.Repository.init(pathToRepo, isBare)
}
