'use strict'
const co = require('co')
const rimrafPromise = require('rimraf-promise')

const getDirsSync = require('./utils/getDirsSync')
const isDirSync = require('./utils/isDirSync')
const readRepoFile = require('./utils/readRepoFile')
const openGitRepo = require('./utils/openGitRepo')
const initBareRepo = require('./utils/initBareRepo')

const ROOT = process.argv[2] || '..'
console.log(`root git repo set to: ${ROOT}`)

// return a list of dirs
module.exports.all = function all(req, res) {
  res.send(getDirsSync(ROOT))
}

// get info for one dir
module.exports.fetch = function fetch(req, res) {
  const id = req.params.id

  co(function *() {
    let gitRepo
    try {
      gitRepo = yield openGitRepo(`${ROOT}/${id}`)
    } catch (err) {
      return res.status(404).send(`repo with id: ${id} was not found`)
    }

    try {
      const blob = yield readRepoFile(gitRepo, 'README.md')
      res.send({
        id,
        readmeContent: blob.toString()
      })
    } catch (err) {
      // no readme file
      res.send({ id })
    }
  })
}

// create a repo
module.exports.add = function add(req, res) {
  const id = req.body && req.body.id

  if (isDirSync(`${ROOT}/${id}`)) {
    res.status(405).send(`${id} already exists.`)
  }

  co(function *() {
    yield initBareRepo(`${ROOT}/${id}`)
    res.send({ id })
  })
}

// delete a repo
module.exports.remove = function remove(req, res) {
  const id = req.params.id
  const fullPath = `${ROOT}/${id}`

  if (!isDirSync(fullPath)) {
    res.status(405).send(`${id} does not exist.`)
  }

  co(function *() {
    try {
      yield rimrafPromise(fullPath, { glob: false });
      res.send({ id })
    } catch (err) {
      res.status(500).send(`error occured when deleting ${id}`)
    }
  })
}
