const path = require ('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

// To configure our express application  
var app = express();

// Creating a server 
var server = http.createServer(app);

// Configuring server to use socket io
var io = socketIO(server);

/* To configure our express static middleware */
app.use(express.static(publicPath));

// lets you register a event
io.on('connection', (socket) => {
  console.log('New user connected');
  
  // Creating a new event
  socket.emit('newMessage', {
    from: 'John',
    text: 'From Server',
    createdAt: 123
  });

  socket.on('createMessage', (createMessage) => {
    console.log('Create Message', createMessage);
});

  socket.on('disconnect', () => {
    console.log('User was disconnected from Client');
  });
});

// Using custom made server instead of express server
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
