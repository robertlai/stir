/* eslint no-console: 0 */
const path = require('path');
const http = require('http');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');

var config = require('./bin/config');

const app = express();
app.use(compression());

const assetsroot = 'dist'
const viewEngine = require('./bin/viewEngine');
app.enable('view cache');
app.engine('html', viewEngine);
app.set('views', path.join(__dirname, assetsroot, 'views'));

if (config.mode !== 'production') {
	require('./bin/dev.js')(app);
}

app.get('*', function(req, res) {
	res.render('index.html');
});

app.use(cookieParser());

console.log('Server running on port: ' + config.port);
http.createServer(app).listen(config.port);