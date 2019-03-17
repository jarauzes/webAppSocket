var socket = io();
var name = '';

socket.on('connect', function() {
    //console.log('Connected to server');
});

socket.on('disconnect', function() {
    //console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('newMessage', message);
    var li = jQuery('<li></li>');

    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').prepend(li);
});

jQuery('#login-form').on('submit', function (e) {
    e.preventDefault();

    if(jQuery('[name=name]').val().trim() != '') {

        if(name === '') {

            name = jQuery('[name=name]').val();
            jQuery('[name=name]').css({display: 'none'});
            jQuery('#login-form span').html(name).css({display: 'block'});
            jQuery('#login-form button').html('Out!');
            jQuery('#chat').css({display: 'block'});

        } else {
            location.reload();
        }

    }

});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    if(jQuery('[name=message]').val().trim() != '') {

        socket.emit('createMessage', {
            from: name,
            text: jQuery('[name=message]').val()
        }, function() {

        });

        jQuery('[name=message]').val('');

    }

});