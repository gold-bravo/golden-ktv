import React, {Component} from 'react'
import {connect} from 'react-redux'
import VideoSearchBar from './videoSearchBar'
import Tokbox from './tokbox'
import axios from 'axios'
import socket from '../socket'

class Room extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    if (this.props.room.roomNum) {
      const {data} = await axios.get(`/api/room/${this.props.room.roomNum}`)
      console.log(data, 'room')
    }
    socket.on('no refresh', room => {
      console.log(room, socket.id)
      if (!room) {
        this.props.history.push('/')
      }
    })
  }

  render() {
    return (
      <div className='roomBG'>
        <VideoSearchBar room={this.props.room.roomNum} />
        {this.props.room.apiKey ? <Tokbox /> : <div />}
      </div>
    )
  }
}

const mSTP = state => ({
  room: state.roomReducer
})

export default connect(mSTP)(Room)
