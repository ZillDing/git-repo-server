'use strict';
const compress = require('koa-compress');
const logger = require('koa-logger');
const serve = require('koa-static');
const route = require('koa-route');
const koa = require('koa');
const cors = require('koa-cors');
const path = require('path');
const app = module.exports = koa();

const repos = require('./controllers/repos');

// cors
app.use(cors());

// Logger
app.use(logger());

app.use(route.get('/', repos.home));
app.use(route.get('/repos/', repos.all));
app.use(route.get('/repos/:id', repos.fetch));
app.use(route.options('/', repos.options));
app.use(route.trace('/', repos.trace));
app.use(route.head('/', repos.head));

// Serve static files
app.use(serve(path.join(__dirname, 'public')));

// Compress
app.use(compress());

if (!module.parent) {
  app.listen(1337);
  console.log('listening on port 1337');
}
