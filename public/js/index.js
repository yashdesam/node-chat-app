var socket = io();

socket.on('connect', function () {
  console.log('Connected to serve');

  socket.on('welcome', (message) => {
    console.log('Welcome message', message);
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');

});

socket.on('newMessage', function (newMessage) {
  console.log('New message', newMessage);
});

