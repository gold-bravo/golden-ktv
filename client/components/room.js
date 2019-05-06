import React, {Component} from 'react'
import {connect} from 'react-redux' 
import VideoSearchBar from './videoSearchBar'

class Room extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    console.log('props from Room component', this.props)
  }

  render() {
    return <VideoSearchBar />
  }
}

const mSTP = state => ({
  room: state.room
})

export default connect(mSTP)(Room)
