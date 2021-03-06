const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


console.log(__dirname + '../public');
console.log(publicPath);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('serverMessage', {
       from: 'Server',
       text: 'Server connection successfull, welcome',
       createAt: new Date()
    });

    socket.on('clientResponse', (newMessage) => {
     console.log('clientResponse', newMessage);
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});