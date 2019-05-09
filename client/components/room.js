import React, {Component} from 'react'
import {connect} from 'react-redux'
import VideoSearchBar from './videoSearchBar'
import socket from '../socket'
// import {OTSession, OTPublisher, OTStreams, OTSubscriber} from 'opentok-react'

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
    return (
      <div>
        <VideoSearchBar room={this.props.room.room} />
        {/* <OTSession
            //TODO: Please fill out keys
            apiKey="46322342"
            sessionId="1_MX40NjMyMjM0Mn5-MTU1NzM0MTA0NDYxNn5RT3Z5cUtUN1gwWXM3cDZyQkdnNnNKWHJ-fg"
            token="T1==cGFydG5lcl9pZD00NjMyMjM0MiZzaWc9OTM2YWQxN2ZhZjlmZTBlMDg1ZDBjMDNiNjJlZTM3NTI0ZDE1MTg1NjpzZXNzaW9uX2lkPTFfTVg0ME5qTXlNak0wTW41LU1UVTFOek0wTVRBME5EWXhObjVSVDNaNWNVdFVOMWd3V1hNM2NEWnlRa2RuTm5OS1dISi1mZyZjcmVhdGVfdGltZT0xNTU3MzQxMDY0Jm5vbmNlPTAuNjA4NjY4MTQ2OTc3NTMwNCZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTU5OTMzMDY0JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9"
          >
            <OTPublisher />
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
