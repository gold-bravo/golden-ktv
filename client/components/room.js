import React, {Component} from 'react'
import {connect} from 'react-redux'
import VideoSearchBar from './videoSearchBar'
import Tokbox from './tokbox'
import axios from 'axios'
import {
  OTSession,
  OTPublisher,
  OTStreams,
  OTSubscriber,
  createSession
} from 'opentok-react'
import socket from '../socket'
class Room extends Component {
  constructor(props) {
    super(props)
    console.log('Room peops', this.props)
    this.state = {streams: []}
  }

  async componentDidMount() {
    let roomNum = this.props.location.pathname.slice(6)
    const {data} = await axios.get(`/api/room/${roomNum}`)
    console.log(data)

    socket.on('no refresh', id => {
      if (id) {
        this.props.history.push('/')
      }
    })
  }

  render() {
    return (
      <div>
        <VideoSearchBar room={this.props.room} />
        {/* <Tokbox /> */}
      </div>
    )
  }
}

const mSTP = state => ({
  room: state.roomReducer.roomNum
})

export default connect(mSTP)(Room)
