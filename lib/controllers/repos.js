'use strict';
const path = require('path');
const parse = require('co-body');
const rimrafPromise = require('rimraf-promise');

const getDirsSync = require('../utils/getDirsSync');
const isDirSync = require('../utils/isDirSync');
const readRepoFile = require('../utils/readRepoFile');
const openGitRepo = require('../utils/openGitRepo');
const initBareRepo = require('../utils/initBareRepo');

const ROOT = '..';

module.exports.home = function * home(next) {
  if ('GET' != this.method) return yield next;

  this.body = 'home';
};

// This must be avoided, use ajax in the view.
module.exports.all = function * all(next) {
  if ('GET' != this.method) return yield next;

  this.body = getDirsSync(ROOT);
};

module.exports.fetch = function * fetch(id, next) {
  if ('GET' != this.method) return yield next;

  let gitRepo;
  try {
    gitRepo = yield openGitRepo(path.join(ROOT, id));
  } catch (err) {
    this.throw(404, `repo with id: ${id} was not found`);
  }

  try {
    const blob = yield readRepoFile(gitRepo, 'README.md');
    this.body = {
      id,
      readmeContent: blob.toString()
    };
  } catch (err) {
    // no readme file
    this.body = { id };
  }
};

module.exports.add = function * add(data, next) {
  if ('POST' != this.method) return yield next;

  const repo = yield parse(this);
  const id = repo.id;

  if (isDirSync(path.join(ROOT, id))) {
    this.throw(405, `${id} already exists.`);
  }

  yield initBareRepo(path.join(ROOT, id));
  this.body = repo;
};

module.exports.remove = function * remove(id, next) {
  if ('DELETE' != this.method) return yield next;

  const fullPath = path.join(ROOT, id);

  if (!isDirSync(fullPath)) {
    this.throw(405, `${id} does not exist.`);
  }

  try {
    yield rimrafPromise(fullPath, { glob: false });
    this.body = { id };
  } catch (err) {
    this.throw(500, `error occured when deleting ${id}`);
  }
};

module.exports.head = function * (){
  return;
};

module.exports.options = function * () {
  this.body = "Allow: HEAD,GET,PUT,DELETE,OPTIONS";
};

module.exports.trace = function * () {
  this.body = "Smart! But you can't trace.";
};
