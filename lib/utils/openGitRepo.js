'use strict';
const Git = require('nodegit');

module.exports = function (path) {
  return Git.Repository.open(path)
}
