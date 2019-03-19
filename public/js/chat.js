var socket = io();

socket.on('connect', function() {

    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function (err) {
        if(err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('no error');
        }
    });

});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});
socket.on('updateUserList', function (users) {
    var ol = jQuery('<ol></ol>');

    users.forEach(function (user) {
        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);

});

socket.on('newMessage', function(message) {

    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').prepend(html);

});

socket.on('newLocationMessage', function (message) {

    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template-location').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').prepend(html);
});

jQuery('#message-form').on('submit', function (e) {

    e.preventDefault();

    var messageTextbox = jQuery('[name=message]')

    if(jQuery('[name=message]').val().trim() != '') {

        socket.emit('createMessage', {
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