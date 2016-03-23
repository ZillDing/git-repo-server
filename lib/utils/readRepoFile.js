'use strict'

module.exports = function (repo, filePath) {
  return repo.getBranchCommit('master')
    .then(commit => {
      return commit.getEntry(filePath)
    })
    .then(entry => {
      return entry.getBlob()
    })
}
