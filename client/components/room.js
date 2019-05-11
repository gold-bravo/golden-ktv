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
    const {data} = await axios.get(`/api/room/${this.props.room.roomNum}`)
    console.log(data, 'room')

    socket.on('no refresh', id => {
      if (id) {
        this.props.history.push('/')
      }
    })
  }

  render() {
    return (
      <div>
        <VideoSearchBar room={this.props.room.roomNum} />
        <Tokbox />
      </div>
    )
  }
}

const mSTP = state => ({
  room: state.roomReducer
})

export default connect(mSTP)(Room)
