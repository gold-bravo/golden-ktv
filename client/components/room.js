import React, {Component} from 'react'
import {connect} from 'react-redux'
import VideoSearchBar from './videoSearchBar'
import {OTSession, OTPublisher, OTStreams, OTSubscriber} from 'opentok-react'

class Room extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <VideoSearchBar room={this.props.room.room} />
        <OTSession
          apiKey="46321722"
          sessionId="2_MX40NjMyMTcyMn5-MTU1NzAyMjc5OTIwM35nSDNOVlMwUjlsUGFNbmZmTnZIeEhPeG1-fg"
          token="T1==cGFydG5lcl9pZD00NjMyMTcyMiZzaWc9MzliMzE4ZmMwZjViODdhZjE0YmI0MmFiNDRhOTQxMmFkYTJkMmQ0ODpzZXNzaW9uX2lkPTJfTVg0ME5qTXlNVGN5TW41LU1UVTFOekF5TWpjNU9USXdNMzVuU0ROT1ZsTXdVamxzVUdGTmJtWm1UblpJZUVoUGVHMS1mZyZjcmVhdGVfdGltZT0xNTU3MDIyNzk5JnJvbGU9bW9kZXJhdG9yJm5vbmNlPTE1NTcwMjI3OTkuMjIwMTEyMjc3NzIzOTY="
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
