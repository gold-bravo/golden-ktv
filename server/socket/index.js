module.exports = io => {
  // let users = []
  // let connections = []
  // let curData
  // let playTime
  let rooms = {}

  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
      // connections.splice(connections.indexOf(socket), 1)
    })

    socket.on('join room', roomNumber => {
      // If roomNumber is not in our room storage, add the roomNumber
      if (!rooms.hasOwnProperty(roomNumber)) {
        rooms[roomNumber] = {}
      } else {
        io
          .to(socket.id)
          .emit(
            'welcome',
            rooms[roomNumber].curData,
            rooms[roomNumber].playTime
          )
      }
      // Socket is now connected to the specific roomNumber
      socket.join(roomNumber)
      console.log(rooms)
    })

    //console log back-end playing when playing YT video
    socket.on('play', (data, time, roomNumber) => {
      console.log(roomNumber)
      rooms[roomNumber].curData = data
      if (time) {
        console.log(time)
        rooms[roomNumber].playTime = time
      }
      socket.to(roomNumber).emit('playing', rooms[roomNumber].curData)
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
