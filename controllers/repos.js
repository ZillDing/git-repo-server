'use strict';
const path = require('path');
const parse = require('co-body');

const getDirsSync = require('../utils/getDirsSync');
const isDirSync = require('../utils/isDirSync');
const readRepoFile = require('../utils/readRepoFile');
const openGitRepo = require('../utils/openGitRepo');
const initBareRepo = require('../utils/initBareRepo');

const ROOT = '/opt/git';

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

module.exports.head = function * (){
  return;
};

module.exports.options = function * () {
  this.body = "Allow: HEAD,GET,PUT,DELETE,OPTIONS";
};

module.exports.trace = function * () {
  this.body = "Smart! But you can't trace.";
};
