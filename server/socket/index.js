module.exports = io => {
  // let users = []
  // let connections = []
  let rooms = {}

  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.emit('no refresh', socket.room)
    socket.emit('send id', socket.id)
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
      // connections.splice(connections.indexOf(socket), 1)
    })

    socket.on('join room', roomNumber => {
      // If roomNumber is not in our room storage, add the roomNumber
      socket.room = roomNumber
      if (!rooms.hasOwnProperty(roomNumber)) {
        rooms[roomNumber] = {}
      }
      // socket.join(roomNumber)
      console.log(socket.id)
      socket.join(roomNumber)
      // socket.emit('success', roomNumber)
      // Socket is now connected to the specific roomNumber
    })

    //STEP TWO: When successful, the new user can be feed the new data.
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
            rooms[roomNumber].playTime ? rooms[roomNumber].playTime : null,
            socket.id
          )
      }
    })

    //Listen for queue added, tell others to update queue
    socket.on('queue added', (data, roomNumber) => {
      rooms[roomNumber].curData = data
      console.log('queue added', data, roomNumber)
      socket.to(roomNumber).emit('update queue', rooms[roomNumber].curData)
    })

    //console log back-end playing when playing YT video
    socket.on('play', (data, time, roomNumber) => {
      console.log('play', roomNumber)
      if (!rooms[roomNumber].playTime) {
        console.log('play', time)
        rooms[roomNumber].playTime = time
        rooms[roomNumber].curData = data
        socket.to(roomNumber).emit('playing')
      }
      //maybe don't need to emit curdata?
      // socket.to(roomNumber).emit('playing', rooms[roomNumber].curData)
    })

    socket.on('end', (data, roomNumber) => {
      console.log('ended')
      rooms[roomNumber].playTime = null
      rooms[roomNumber].curData = data
      socket.to(roomNumber).emit('update queue', rooms[roomNumber].curData)
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
// host user designate func
// play sync - allow only host to play? or whoever's turn to sing, only that person to play?
//
