module.exports = io => {
  // let connections = []
  // let users = {}
  let rooms = {}

  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.emit('no refresh', socket.room)
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
      //if socket left after joining a room, meaning refreshed page
      if (socket.room) {
        //if the room has no queue(data)
        if (rooms[socket.room].curData && !rooms[socket.room].curData.length) {
          rooms[socket.room].curTime = null
        }
        socket.leave(socket.room)
      }
      //clean up or delete room if there is no user
      //How to handle disconnect aka refresh concerning the data that the user had
      //Can we make it so that the user's record persist when re-enter?
      // connections.splice(connections.indexOf(socket), 1)
    })

    socket.on('join room', roomNumber => {
      //attach roomnumber to socket
      socket.room = roomNumber

      // If roomNumber is not in our room storage, add the roomNumber
      if (!rooms.hasOwnProperty(roomNumber)) {
        rooms[roomNumber] = {}
        socket.emit('you are the host')
      }

      console.log(socket.id)
      socket.emit('send id', socket.id)
      // socket.join(roomNumber)
      // socket.emit('success', roomNumber)

      // Socket is now connected to the specific roomNumber
      socket.join(roomNumber).emit('success', roomNumber)
    })

    //STEP TWO: When videoSearchBar component is successfully mounted, the new user can be feed the new data.
    socket.on('success', roomNumber => {
      console.log('in success', roomNumber, socket.id)
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
    //Listen for queue added, tell others to update queue
    socket.on('queue added', (data, roomNumber) => {
      console.log('queue added', data)
      rooms[roomNumber].curData = data
      socket.to(roomNumber).emit('update queue', rooms[roomNumber].curData)
    })

    socket.on('leaving', (data, roomNumber) => {
      rooms[roomNumber].curData = data
      //if there is nothing in the queue, meaning no songs playing set curtime to null
      if (!data.length) {
        rooms[roomNumber].curTime = null
      }
      console.log('leaving', data)
      socket.to(roomNumber).emit('update queue', rooms[roomNumber].curData)
      //leave room
      socket.leave(roomNumber)
    })

    //console log back-end playing when playing YT video
    socket.on('play', (data, time, roomNumber) => {
      console.log('play', rooms[roomNumber])
      console.log('time', time)
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
      console.log('ended')
      rooms[roomNumber].playTime = null
      rooms[roomNumber].curData = data
      //Tell others to update the queue but also set the curtime to null
      socket
        .to(roomNumber)
        .emit('update queue', rooms[roomNumber].curData, 'stop playing')
    })

    // Console log back-end playing when playing YT video
    // roomInfo contains {videoId, roomId} (passed in from videoPlayer component)
    // socket.on('play', roomInfo => {
    // console.log('back-end playing', roomInfo)
    // Specific room will play the room's respective video
    // socket.to(roomInfo.roomId).emit('play', roomInfo.videoId)
    // })
  })
}

//TODO:on disconnect probably do something to the disconnected socket
// destroy room when there is no user
// if not registered in a room kick out of the room
// limit number of search per user in a given time
// play sync - allow only host to play? or whoever's turn to sing, only that person to play?
//Passing on the host to others when the host leaves??
