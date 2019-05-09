module.exports = io => {
  // let users = []
  // let connections = []
  let rooms = {}

  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.emit('no refresh', socket.id)
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
      // connections.splice(connections.indexOf(socket), 1)
    })

    socket.on('join room', roomNumber => {
      // If roomNumber is not in our room storage, add the roomNumber
      //TODO://create user on join room
      // socket.user = socket.id
      // users.push(socket.user)
      if (!rooms.hasOwnProperty(roomNumber)) {
        rooms[roomNumber] = {}
      } else if (rooms[roomNumber].curData) {
        console.log(socket.id)
        io
          .to(socket.id)
          .emit(
            'welcome',
            rooms[roomNumber].curData,
            rooms[roomNumber].playTime ? rooms[roomNumber].playTime : null
          )
      }
      // Socket is now connected to the specific roomNumber
      socket.join(roomNumber)
      console.log('join room', rooms)
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
        // rooms[roomNumber].curData = data
        socket.to(roomNumber).emit('playing')
      }
      //maybe don't need to emit curdata?
      // socket.to(roomNumber).emit('playing', rooms[roomNumber].curData)
    })

    socket.on('end', (data, roomNumber) => {
      console.log('ended')
      rooms[roomNumber].playTime = null
      rooms[roomNumber].curData = data
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
