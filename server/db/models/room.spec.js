/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Room = db.model('room')

describe('Room model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  let lobby
  describe('roomCreation', () => {
    beforeEach(async () => {
      lobby = await Room.create({
        curTime: 3.1415,
        roomNum: 'lobby',
        queue: [{}],
        users: [
          {
            1: 'adkjlajdkflkfdsjf'
          },
          {2: 'dafkdsjfhadfhsfj'}
        ],
        sessionId: 'eqrkejlfh43432kehwjsdnfmb'
      })
    })

    it('the queue returns an array', () => {
      expect(lobby.queue).to.be.an('array')
    })
    it('The users property returns an array', () => {
      expect(lobby.queue).to.be.an('array')
    })
  })
}) // end describe('Room model')
