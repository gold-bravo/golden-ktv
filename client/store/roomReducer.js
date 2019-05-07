import socket from '../socket'

//ACTION CONSTANTS
const GET_ROOM = 'GET_ROOM'

//INITIAL STATE
const defaultRoom = {room: ''}

//ACTION CREATOR
const getRoom = roomNum => {
  return {
    type: GET_ROOM,
    roomNum
  }
}

//THUNK CREATOR
export const setRoom = roomNum => async dispatch => {
  try {
    //sockets should be utilized in our thunk middleware
    await socket.emit('join room', roomNum)
    dispatch(getRoom(roomNum))
  } catch (error) {
    console.log('Error in thunk')
  }
}

const roomReducer = (state = defaultRoom, action) => {
  switch (action.type) {
    case GET_ROOM:
      return {...state, room: action.roomNum}
    default:
      return defaultRoom
  }
}

export default roomReducer
