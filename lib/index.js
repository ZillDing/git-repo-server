'use strict';
const compress = require('koa-compress');
const logger = require('koa-logger');
const serve = require('koa-static');
const route = require('koa-route');
const send = require('koa-send');
const koa = require('koa');
const cors = require('koa-cors');
const corsError = require('koa-cors-error');
const path = require('path');
const app = module.exports = koa();

const repos = require('./controllers/repos');

// cors
app.use(cors());
app.use(corsError);

// Logger
app.use(logger());

app.use(route.get('/api/repos/', repos.all));
app.use(route.get('/api/repos/:id', repos.fetch));
app.use(route.post('/api/repos/', repos.add));
app.use(route.delete('/api/repos/:id', repos.remove));

// Serve static files
app.use(serve(path.join(__dirname, 'public')));
app.use(route.get('/(.*)', function *() {
  yield send(this, '/lib/public/index.html');
}));

// Compress
app.use(compress());

if (!module.parent) {
  app.listen(1337);
  console.log('listening on port 1337');
}
