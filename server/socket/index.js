module.exports = io => {
  // let connections = []
  // let users = []
  let rooms = {}

  io.on('connection', socket => {
    socket.emit('no refresh', socket.room)
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
      //if socket left after joining a room, meaning refreshed page
      if (rooms[socket.room]) {
        //if the room has no queue(data)
        if (rooms[socket.room].curData && !rooms[socket.room].curData.length) {
          rooms[socket.room].curTime = null
        }
        //if socket had a name attached to it
        if (socket.name) {
          //update our user array minus the socket leaving
          rooms[socket.room].user = rooms[socket.room].user.filter(
            user => user !== socket.name
          )
          //tell others in the room to update their list
          io.to(socket.room).emit('update', null, null, rooms[socket.room].user)

          if (socket.host) {
            const newHostIdx = Math.floor(
              Math.random() * rooms[socket.room].user.length
            )
            console.log(socket.room, 'refresh', rooms[socket.room].user)
            console.log(
              'refresh',
              'new host',
              rooms[socket.room].user[newHostIdx]
            )
            io.to(socket.room).emit('new host', newHostIdx)
          }

          if (!rooms[socket.room].user.length) {
            delete rooms[socket.room]
          }
        }
      }

      //How to handle disconnect aka refresh concerning the data that the user had
      //Can we make it so that the user's record persist when re-enter?
    })

    socket.on('join room', (roomNumber, name) => {
      //attach roomnumber to socket
      socket.room = roomNumber
      //attach name to socket
      socket.name = name

      // If roomNumber is not in our room storage, add the roomNumber
      if (!rooms.hasOwnProperty(roomNumber)) {
        rooms[roomNumber] = {}
        //indicate you are the host
        //socket.host = true
        socket.emit('you are the host')
      }

      // Initialize user array or add to the array
      rooms[roomNumber].user = (rooms[roomNumber].user || []).concat(name)
      console.log('join room', rooms[roomNumber].user.length)

      //tell others in the room that someone just joined in
      setTimeout(() => {
        console.log(socket.id)
        // io.in(roomNumber).emit('send id', socket.id, rooms[roomNumber].user)
        socket.to(roomNumber).emit('send id', socket.id, rooms[roomNumber].user)
      }, 500)

      // socket.emit('send id', socket.id, rooms[roomNumber].user)
      // socket.join(roomNumber)
      // socket.emit('success', roomNumber)

      // Socket is now connected to the specific roomNumber
      socket.join(roomNumber).emit('success', roomNumber)
    })

    //STEP TWO: When videoSearchBar component is successfully mounted, the new user can be feed the new data.
    socket.on('success', roomNumber => {
      const newUser = socket.id
      //STEP THREE: Now emit back the welcome socket.
      if (socket.room) {
        io
          .to(newUser)
          .emit(
            'welcome',
            rooms[roomNumber].curData,
            rooms[roomNumber].playTime ? rooms[roomNumber].playTime : null
          )
      }
    })
    //Listen for queue added, tell others to update
    socket.on('queue added', (data, roomNumber) => {
      rooms[roomNumber].curData = data
      //Tell others in the room to update their queue
      socket.to(roomNumber).emit('update', rooms[roomNumber].curData)
    })

    socket.on('leaving', (data, roomNumber, name) => {
      //update our user array to exclude the socket who just left
      rooms[roomNumber].user = rooms[roomNumber].user.filter(
        user => user !== name
      )
      rooms[roomNumber].curData = data

      //if there is nothing in the queue, meaning no songs playing set curtime to null
      if (!data.length) {
        rooms[roomNumber].curTime = null
      }

      //Tell others in the room to update their queue and userlist
      socket
        .to(roomNumber)
        .emit('update', rooms[roomNumber].curData, null, rooms[roomNumber].user)

      if (!rooms[roomNumber].user.length) {
        delete rooms[roomNumber]
      }
      //leave room
      socket.leave(roomNumber)
    })

    socket.on('play', (data, time, roomNumber) => {
      //If a room has no playTime, either it is the first video or a video that is loaded but not played
      if (!rooms[roomNumber].playTime) {
        rooms[roomNumber].playTime = time
        rooms[roomNumber].curData = data
        // socket.to(roomNumber).emit('playing')
      }
      socket.to(roomNumber).emit('playing')
      // else {
      //   socket.to(socket.id).emit('playing', rooms[roomNumber].curData)
      // }
    })

    socket.on('end', (data, roomNumber) => {
      rooms[roomNumber].playTime = null
      rooms[roomNumber].curData = data
      //Tell others to update the queue but also set the curtime to null
      socket
        .to(roomNumber)
        .emit('update', rooms[roomNumber].curData, 'stop playing')
    })

    socket.on('new message', (msg, name) => {
      //Tell others in the room to update their chatbox
      io.to(socket.room).emit('update msg', msg, name)
    })
  })
}

// TODO:on disconnect probably do something to the disconnected socket
// destroy room when there is no user
// if not registered in a room kick out of the room
// limit number of search per user in a given time
// play sync - allow only host to play? or whoever's turn to sing, only that person to play?
// Passing on the host to others when the host leaves??

// Userlist -- need to consider updating upon joining, and leaving, refresh
// emit a msg to the room when someone joins, maybe it should not be on chatbox
// 'guest user has joined the room'

// react mapping key issue
// possible to finish chatbox, userlist, passing the host function
// the host on the userlist should have some cue to indicate that the person is host
// may need to attach isHost prop to a username
// socket.emit('you are the host')
