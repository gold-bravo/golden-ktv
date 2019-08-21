import React, {Component} from 'react'
import {connect} from 'react-redux'
import VideoSearchBar from './VideoSearchBar'
import socket from '../socket'

class Room extends Component {
  componentDidMount() {
    socket.on('no refresh', room => {
      if (!room) {
        this.props.history.push('/')
      }
    })
  }

  render() {
    const {room} = this.props
    return (
      <div>
        <VideoSearchBar room={room.roomNum} name={room.name} />
      </div>
    )
  }
}

const mSTP = state => ({
  room: state.roomReducer
})

export default connect(mSTP)(Room)
