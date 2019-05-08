import React, {Component} from 'react'
import {connect} from 'react-redux'
import VideoSearchBar from './videoSearchBar'
import {OTSession, OTPublisher, OTStreams, OTSubscriber} from 'opentok-react'

class Room extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <VideoSearchBar room={this.props.room.room} />
        <OTSession
          //TODO: Please fill out keys
          apiKey=""
          sessionId=""
          token=""
        >
          <OTPublisher />
          <OTStreams>
            <OTSubscriber />
          </OTStreams>
        </OTSession>
      </div>
    )
  }
}

const mSTP = state => ({
  room: state.roomReducer
})

export default connect(mSTP)(Room)
