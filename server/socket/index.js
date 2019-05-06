module.exports = io => {
  // let users = []
  // let connections = []
  let rooms = []

  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
      // connections.splice(connections.indexOf(socket), 1)
    })

    socket.on('join room', roomNumber => {
      // If roomNumber is not in our room storage, add the roomNumber
      if (!rooms.includes(roomNumber)) {
        rooms.push(roomNumber)
      }
      // Socket is now connected to the specific roomNumber
      socket.join(roomNumber)
      console.log(rooms)
    })

    // Console log back-end playing when playing YT video
    // roomInfo contains {videoId, roomId} (passed in from videoPlayer component)
    socket.on('play', roomInfo => {
      console.log('back-end playing', roomInfo)
    // Specific room will play the room's corresponding video
      socket.to(roomInfo.roomId).emit('play', roomInfo.videoId)
    })
  })
}
