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
import socket from '../socket'
class Room extends Component {
  constructor(props) {
    super(props)
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
    // this.sessionHelper = createSession({
    //   //waiting for stuff
    //   apiKey: data.KEY,
    //   sessionId: data.sessionId,
    //   onStreamsUpdated: streams => {
    //     this.setState({streams})
    //   }
    // })
  }

  componentWillUnmount() {
    this.sessionHelper.disconnect()
  }

  render() {
    console.log(this.props.room.room)
  }

  render() {
    return (
      <div>
        <VideoSearchBar room={this.props.room.room} />
        {/* <OTSession
        //TODO: Please fill out keys
        > */}
        {/* <OTPublisher session={this.sessionHelper.session} />
        <OTStreams>
          <OTSubscriber />
        </OTStreams>
        </OTSession> */}
      </div>
    )
  }
}

const mSTP = state => ({
  room: state.roomReducer
})

export default connect(mSTP)(Room)
