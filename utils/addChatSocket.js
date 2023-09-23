const { corsSocketOptions } = require('../config/corsOptions');

const users = [];

function addChatSocket(expressApp){
    const server = require('http').createServer(expressApp);
    const io = require('socket.io')(server, corsSocketOptions);

    io.on('connect', (socket) => {
        socket.on('join', ({ name, room }, callback) => {
            console.log(`user ${name} joined room ${room}`);

            const { error, user } = addUser({ id: socket.id, name, room });

            if(error) return callback(error);

            console.log('users', users);
            socket.join(user.room);

            socket.emit('message', { user: 'bot', text: `${user.name}, welcome to room ${user.room}.`});
            socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

            callback();
        });

        socket.on('sendMessage', (message, callback) => {
            const user = getUser(socket.id);

            if(!user){
                console.log('false user: ', user);
                return;
            }

            io.to(user.room).emit('message', { user: user.name, text: message });

            callback();
        });

        socket.on('disconnect', () => {
            const user = removeUser(socket.id);
            
            if(user) {
                io.to(user.room).emit('message', { user: 'bot', text: `${user.name} has left.` });
                io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
            }
        })
    });

    return server;
}

function addUser({ id, name, room }){
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => user.room === room && user.name === name);

  if(!name || !room) return { error: 'Username and room are required.' };
  if(existingUser) return { error: 'User already in the room' };

  const user = { id, name, room };

  users.push(user);

  return { user };
}

function removeUser(id){
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

function getUser(id){
    return users.find((user) => user.id === id);

}

function getUsersInRoom(room){
    return users.filter((user) => user.room === room);
}

module.exports = addChatSocket;