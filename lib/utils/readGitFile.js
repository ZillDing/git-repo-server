'use strict'
const Git = require('nodegit')

module.exports = function (repoPath, filePath) {
  return Git.Repository
    .open(repoPath)
    .then(repo => {
      return repo.getBranchCommit('master')
    })
    .then(commit => {
      return commit.getEntry(filePath)
    })
    .then(entry => {
      return entry.getBlob()
    })
}
