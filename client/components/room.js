import React, {Component} from 'react'
import {connect} from 'react-redux'
import VideoSearchBar from './videoSearchBar'
import socket from '../socket'

class Room extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    socket.on('no refresh', id => {
      if (id) {
        this.props.history.push('/')
      }
    })
  }

  render() {
    console.log(this.props)
    return <VideoSearchBar room={this.props.room.room} />
  }
}

const mSTP = state => ({
  room: state.roomReducer
})

export default connect(mSTP)(Room)
