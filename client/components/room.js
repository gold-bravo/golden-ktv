import React, {Component} from 'react'
import {connect} from 'react-redux'
import VideoSearchBar from './videoSearchBar'
import Tokbox from './tokbox'
import axios from 'axios'
import socket from '../socket'

class Room extends Component {
  async componentDidMount() {
    if (this.props.room.roomNum) {
      const {data} = await axios.get(`/api/room/${this.props.room.roomNum}`)
    }
    socket.on('no refresh', room => {
      if (!room) {
        this.props.history.push('/')
      }
    })
  }

  render() {
    return (
      <div>
        <VideoSearchBar room={this.props.room.roomNum} />
        {/* <div className="right-sidebar">
          {this.props.room.apiKey ? <Tokbox /> : <div />}
        </div> */}
      </div>
    )
  }
}

const mSTP = state => ({
  room: state.roomReducer
})

export default connect(mSTP)(Room)
