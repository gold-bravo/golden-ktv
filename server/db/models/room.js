const Sequelize = require('sequelize')
const db = require('../db')

const Room = db.define('room', {
  curTime: {type: Sequelize.FLOAT},
  roomNum: {type: Sequelize.STRING},
  queue: {type: Sequelize.ARRAY(Sequelize.TEXT), defaultValue: []},
  users: {type: Sequelize.ARRAY(Sequelize.TEXT), defaultValue: []},
  sessionId: {type: Sequelize.TEXT}
})

module.exports = Room
