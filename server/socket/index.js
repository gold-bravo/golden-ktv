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
      if (!rooms.hasOwnProperty(roomNumber)) {
        rooms[roomNumber] = {}
      }

      socket.join(roomNumber).emit('success', roomNumber)
      // Socket is now connected to the specific roomNumber
    })

    //STEP TWO: When videoSearchBar component is successfully mounted, the new user can be feed the new data.
    socket.on('success', roomNumber => {
      // console.log('rooms[roomNumber].curData', rooms[roomNumber].curData)
      const newUser = socket.id
      //STEP THREE: Now emit back the welcome socket.
      console.log(rooms[roomNumber], 'newUser')
      io
        .to(newUser)
        .emit(
          'welcome',
          rooms[roomNumber].curData,
          rooms[roomNumber].playTime ? rooms[roomNumber].playTime : null
        )
    })

    //Listen for queue added, tell others to update queue
    socket.on('queue added', (data, roomNumber) => {
      // console.log('queue added', data, roomNumber)
      rooms[roomNumber].curData = data

      socket.to(roomNumber).emit('update queue', rooms[roomNumber].curData)
    })

    //console log back-end playing when playing YT video
    socket.on('play', (data, time, roomNumber) => {
      console.log('play', rooms[roomNumber])
      console.log('time', time)
      //If a room has no playTime, either it is the first video or a video that is loaded but not played
      if (!rooms[roomNumber].playTime) {
        rooms[roomNumber].playTime = time
        rooms[roomNumber].curData = data
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
