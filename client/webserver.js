const socket = require('socket.io');
// const http = require('http')
const https = require('https')
const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');


const privateKey = fs.readFileSync('/faculdade/domain.key', 'utf8');
const certificate = fs.readFileSync('/faculdade/domain.crt', 'utf8');

const credentials = {key: privateKey, cert: certificate};

const port = 3000
app.set('port', port);

const server = https.createServer(credentials, app);
server.listen(app.get('port'), function () {
  console.log('WebService iniciou. Porta: ' + app.get('port'));
});

// WebService http://localhost:3000
app.get('/', function(req, res) {
    res.sendFile(path.join('/faculdade/interface/index.html'));
});

// script file
app.get('/interface/app.js', function(req, res) {
    res.sendFile(path.join('/faculdade/interface/app.js'));
});

// WebSocket
const io = socket(server);
io.on('connection', function (conn) {
	console.log("Área conectada.");
	
	// escutando o evento
	conn.on('face.recognize', require('./face_recognize')(conn));
});