'use strict';
const NodeGit = require("nodegit");

module.exports = function (repoPath) {
  const pathToRepo = require("path").resolve(repoPath);
  const isBare = 1;
  return NodeGit.Repository.init(pathToRepo, isBare);
}
