const router = require('express').Router()
const OpenTok = require('opentok')
const {Room} = require('../db/models')
module.exports = router

router.put('/', async (req, res, next) => {
  try {
    //retrieves a process.env-protected APIKEY and SECRET
    const KEY = process.env.TOKBOX_API_KEY
    const SECRET = process.env.TOKBOX_SECRET
    let opentok = new OpenTok(KEY, SECRET)
    let roomNumber = req.body.roomNum
    const roomSearch = await Room.findOrCreate({
      where: {roomNum: roomNumber}
    })
    //roomSearch1 means I was created, !roomSearch[0].sessionId means that I have no session ID, and the only time I don't have a sessionId is when I was first created
    if (!roomSearch[0].sessionId) {
      console.log('Im in here!')
      opentok.createSession((err, session) => {
        if (err) throw err
        roomSearch[0]
          .update({sessionId: session.sessionId})
          .then(() =>
            res.send({
              KEY,
              sessionId: roomSearch[0].sessionId,
              token: opentok.generateToken(roomSearch[0].sessionId)
            })
          )
      })
    }
  } catch (error) {
    console.error(error)
  }
})

router.get('/:roomId', async (req, res, next) => {
  try {
    const foundRoom = await Room.findOne({where: {roomNum: req.params.roomId}})
    console.log(foundRoom.sessionId, 'here found')
    res.send({sessionId: foundRoom.sessionId})
  } catch (error) {
    console.error(error)
  }
})
