const OpenTok = require('opentok')
let key = "3634172", secret='0eba37f885cd66387b1e26688b03c0e1f4f94304'
let opentok = new OpenTok(key, secret)
opentok.createSession((err, session) => {
  console.log("asdf", "err", err)
})
