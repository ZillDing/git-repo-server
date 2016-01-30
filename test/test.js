'use strict';

const getDirs = require('../utils/getDirs');
const readGitFile = require('../utils/readGitFile');
const isDir = require('../utils/isDir');
const isGitRepo = require('../utils/isGitRepo');

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

isGitRepo('.').then(() => {
  console.log(true);
}).catch(err => {
  console.log(false);
})
