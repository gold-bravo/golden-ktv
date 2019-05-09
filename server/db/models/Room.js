const Sequelize = require('sequelize')
const db = require('../db')

const Room = db.define('Rooms', {
  curTime: {type: Sequelize.FLOAT},
  queue: {type: Sequelize.ARRAY(Sequelize.STRING)},
  users: {type: Sequelize.ARRAY(Sequelize.STRING)},
  sessionId: {type: Sequelize.STRING}
})

module.exports = Room
