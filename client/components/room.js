import React, {Component} from 'react'
import {connect} from 'react-redux'
import VideoSearchBar from './videoSearchBar'
import axios from 'axios'
import {
  OTSession,
  OTPublisher,
  OTStreams,
  OTSubscriber,
  createSession
} from 'opentok-react'

class Room extends Component {
  constructor() {
    super()
    this.state = {streams: []}
  }
  async componentWillMount() {
    const {data} = await axios.get('/api/tokbox')
    this.sessionHelper = createSession({
      //waiting for stuff
      apiKey: data.KEY,
      onStreamsUpdated: streams => {
        this.setState({streams})
      }
    })
    console.log(this.sessionHelper, 'what;s happen')
  }

  componentWillUnmount() {
    this.sessionHelper.disconnect()
  }

  render() {
    return (
      <div>
        <VideoSearchBar room={this.props.room.room} />
        {/* <OTSession
        //TODO: Please fill out keys
        > */}
        <OTPublisher session={this.sessionHelper.session} />
        <OTStreams>
          <OTSubscriber />
        </OTStreams>
        {/* </OTSession> */}
      </div>
    )
  }
}

const mSTP = state => ({
  room: state.roomReducer
})

export default connect(mSTP)(Room)
