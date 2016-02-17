'use strict';
const path = require('path');

const getDirs = require('../utils/getDirs');
const isGitRepo = require('../utils/isGitRepo');
const readRepoFile = require('../utils/readRepoFile');

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
  // Quick hack.
  yield isGitRepo(path.join(ROOT, id))
    .then(repo => {
      return readRepoFile(repo, 'README.md');
    })
    .then(blob => {
      this.body = {
        id,
        readmeContent: blob.toString()
      };
    }).catch(err => {
      this.body = err.toString();
    });

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
