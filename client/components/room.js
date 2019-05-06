import React, {Component} from 'react'
import VideoSearchBar from './videoSearchBar'
class Room extends Component {
  constructor(props) {
    super(props)
    this.state = {name: '', room: ''}
  }
  render() {
    return <VideoSearchBar />
  }
}

export default Room
