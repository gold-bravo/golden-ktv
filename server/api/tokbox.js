const router = require('express').Router()
const OpenTok = require('opentok')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    //retrieves a process.env-protected APIKEY and SECRET
    const KEY = process.env.TOKBOX_API_KEY
    const SECRET = process.env.TOKBOX_SECRET
    let opentok = new OpenTok(KEY, SECRET)
    opentok.createSession({mediaMode: 'routed'}, (err, session) => {
      if (err) throw err
    })
    console.log(session)
    token = opentok.generateToken(session.id)
    res.send({KEY, SECRET})
  } catch (error) {
    console.error(error)
  }
})
