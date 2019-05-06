let curData
let playTime

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    io.to(socket.id).emit('welcome', curData, playTime)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    //console log back-end playing when playing YT video
    socket.on('play', (data, time) => {
      curData = data
      playTime = time
      // console.log(curData, time)
      socket.broadcast.emit('playing', curData)
    })
    socket.on('end', data => {
      // console.log('ended')
      playTime = null
      curData = data
    })
  })
}
