var socket = io();

socket.on('connect', function () {
  console.log('Connected to serve');

  socket.emit('createMessage', {
    text: 'From Client'
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');

});

socket.on('newMessage', function (newMessage) {
  console.log('New message', newMessage);
});

