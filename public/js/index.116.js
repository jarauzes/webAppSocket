var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('newMessage', message);
    var li = jQuery('<li></li>');

    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').prepend(li);
});

socket.on('newLocationMessage', function (message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {

    e.preventDefault();

    var messageTextbox = jQuery('[name=message]')

    if(jQuery('[name=message]').val().trim() != '') {

        socket.emit('createMessage', {
            from: 'user',
            text: jQuery('[name=message]').val()
        }, function() {
            messageTextbox.val('');
        });

        jQuery('[name=message]').val('');

    }

});

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Browser Failed with Geolocation!');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location....');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location!');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location!');
        alert('Unable to fetch location.');
    });

});