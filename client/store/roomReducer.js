import axios from 'axios'
import socket from '../socket'

const GET_ROOM_INFO = 'GET_ROOM_INFO'

const defaultRoomInfo = {
  name: '',
  roomNum: '',
  session: '',
  token: '',
  apiKey: ''
}

const getRoom = roomInfo => {
  return {
    type: GET_ROOM_INFO,
    roomInfo
  }
}

export const setRoom = roomInfo => async dispatch => {
  try {
    await socket.emit('join room', roomInfo.roomNum, roomInfo.name)
    dispatch(getRoom(roomInfo))
  } catch (error) {
    console.log('Error in thunk')
  }
}

const roomReducer = (state = defaultRoomInfo, action) => {
  switch (action.type) {
    case GET_ROOM_INFO:
      return {...action.roomInfo}
    default:
      return state
  }
}

export default roomReducer
