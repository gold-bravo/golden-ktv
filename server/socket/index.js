module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
    //console log back-end playing when playing YT video
    socket.on('play', videoId => {
      console.log('back-end playing', videoId)
      socket.broadcast.emit('play', videoId)
    })
  })
}
