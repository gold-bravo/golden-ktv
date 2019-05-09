const router = require('express').Router()
module.exports = router

router.get('/', (req, res, next) => {
  try {
    //retrieves a process.env-protected APIKEY
    const apiKey = process.env.apiKey
    const sessionId = process.env.sessionId
    const token = process.env.token
    res.send(apiKey, sessionId, token)
  } catch (error) {
    console.error(error)
  }
})
