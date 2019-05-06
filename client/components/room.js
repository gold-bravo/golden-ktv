import React, {Component} from 'react'
import {connect} from 'react-redux'
import VideoSearchBar from './videoSearchBar'

class Room extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <VideoSearchBar />
  }
}

const mSTP = state => ({
  room: state.roomReducer
})

export default connect(mSTP)(Room)
