var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('serverMessage', function(server) {
    console.log('serverMessage', server);

    socket.emit('clientResponse', {
        from: 'client',
        text: 'hey, This is client 1.'
    });

});