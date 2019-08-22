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
    let name = req.body.name
    const roomSearch = await Room.findOrCreate({
      where: {roomNum: roomNumber}
    })
    //roomSearch1 means I was created, !roomSearch[0].sessionId means that I have no session ID, and the only time I don't have a sessionId is when I was first created
    if (!roomSearch[0].sessionId) {
      opentok.createSession((err, session) => {
        if (err) throw err
        let token = opentok.generateToken(session.sessionId)
        roomSearch[0]
          .update({
            sessionId: session.sessionId,
            users: [...roomSearch[0].users, {[name]: token}]
          })
          .then(() =>
            res.send({
              KEY,
              sessionId: roomSearch[0].sessionId,
              token: token
            })
          )
      })
    } else {
      let token = opentok.generateToken(roomSearch[0].sessionId)
      roomSearch[0]
        .update({
          users: [...roomSearch[0].users, {[name]: token}]
        })
        .then(() =>
          res.send({
            KEY,
            sessionId: roomSearch[0].sessionId,
            token: token
          })
        )
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:roomId', async (req, res, next) => {
  try {
    const foundRoom = await Room.findOne({where: {roomNum: req.params.roomId}})
    res.send({sessionId: foundRoom.sessionId})
  } catch (error) {
    next(error)
  }
})
