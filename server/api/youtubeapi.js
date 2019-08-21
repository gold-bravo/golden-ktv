const router = require('express').Router()
module.exports = router

router.get('/', (req, res, next) => {
  try {
    //retrieves a process.env-protected APIKEY
    const KEY = process.env.GOOGLE_API_KEY
    res.send(KEY)
  } catch (error) {
    next(error)
  }
})
