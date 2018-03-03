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

  // Welcome message form admin
  socket.emit('welcome', {
    from: 'Admin',
    text: 'Welcome buddy',
    createdAt: new Date().getTime()
  });

  // Event send message to every one but sender
    socket.broadcast.emit('newMessage', {
      from: 'Admin',
      text: 'New user added',
      createdAt: new Date().getTime()
    });

  
  // Get new message form user
  socket.on('createMessage', (message) => {
    console.log('Create Message', message);

    // Event send message to every one including sender
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
    
    /* // Event send message to every one but sender
    socket.broadcast.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    }); */
});

  socket.on('disconnect', () => {
    console.log('User was disconnected from Client');
  });
});

// Using custom made server instead of express server
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
