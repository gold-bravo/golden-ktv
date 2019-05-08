const Sequelize = require('sequelize')
const db = require('../db')

const Room = db.define('Rooms', {
  roomNum: {type: Sequelize.STRING},
  curTime: {type: Sequelize.FLOAT},
  queue: {type: Sequelize.ARRAY(Sequelize.STRING)},
  users: {type: Sequelize.ARRAY(Sequelize.STRING)},
  sessionId: {type: Sequelize.TEXT}
})

module.exports = Room
