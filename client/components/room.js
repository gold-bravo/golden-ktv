import React, {Component} from 'react'
import {connect} from 'react-redux'
import VideoSearchBar from './videoSearchBar'

class Room extends Component {
  constructor(props) {
    super(props)
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
