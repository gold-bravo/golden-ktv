module.exports = io => {
  // let users = []
  // let connections = []
  // let rooms = []
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    // connections.push(socket)
    // socket.emit('setRoom', {
    //   id: roomNumber
    // })
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
      // connections.splice(connections.indexOf(socket), 1)
    })
    //console log back-end playing when playing YT video
    socket.on('play', videoId => {
      console.log('back-end playing', videoId)
      socket.broadcast.emit('play', videoId)
    })
  })
}
