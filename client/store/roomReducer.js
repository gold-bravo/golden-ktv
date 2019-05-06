import axios from 'axios'
import socket from '../socket'

const GET_ROOM = 'GET_ROOM'

const defaultRoom = {room: ''}

const getRoom = roomNum => {
  return {
    type: GET_ROOM,
    roomNum
  }
}

export const setRoom = roomNum => async dispatch => {
  try {
    await socket.emit('join room', roomNum)
    dispatch(getRoom(roomNum))
  } catch (error) {
    console.log('Error in thunk')
  }
}

const roomReducer = (state = defaultRoom, action) => {
  switch (action.type) {
    case GET_ROOM:
      console.log('here!')
      return {...state, room: action.roomNum}
    default:
      return defaultRoom
  }
}

export default roomReducer
