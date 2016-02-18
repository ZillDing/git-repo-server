'use strict';
const path = require('path');

const getDirs = require('../utils/getDirs');
const readRepoFile = require('../utils/readRepoFile');
const openGitRepo = require('../utils/openGitRepo');

const ROOT = '/opt/git';

module.exports.home = function * home (next) {
  if ('GET' != this.method) return yield next;
  this.body = 'home';
};

// This must be avoided, use ajax in the view.
module.exports.all = function * all (next) {
  if ('GET' != this.method) return yield next;
  this.body = getDirs(ROOT);
};

module.exports.fetch = function * fetch (id, next) {
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

module.exports.head = function * (){
  return;
};

module.exports.options = function * () {
  this.body = "Allow: HEAD,GET,PUT,DELETE,OPTIONS";
};

module.exports.trace = function * () {
  this.body = "Smart! But you can't trace.";
};
