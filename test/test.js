'use strict';

const getDirs = require('../utils/getDirs');
const readGitFile = require('../utils/readGitFile');
const isDir = require('../utils/isDir');
const initBareRepo = require('../utils/initBareRepo');

console.log(getDirs('.'));

// readGitFile('.', 'README.md')
//   .then(blob => {
//     console.log(blob.toString());
//   })
//   .catch(err => {
//     console.log('!!!');
//     console.log(err);
//   });

console.log(isDir('utils'));

initBareRepo('my-proj').then(repo => {
  console.log(repo);
}).catch(err => {
  console.log(err);
})
