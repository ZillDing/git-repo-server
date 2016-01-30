'use strict';
const Git = require('nodegit');

module.exports = function (path) {
  return new Promise((resolve, reject) => {
    return Git.Repository
      .open(path)
      .then(repo => {
        resolve(repo);
      })
      .catch(err => {
        reject(err);
      });
  })
}
