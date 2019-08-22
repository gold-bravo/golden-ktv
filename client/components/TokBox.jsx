import React, {Component} from 'react'
import {connect} from 'react-redux'
import {OTSession, OTPublisher, OTStreams, OTSubscriber} from 'opentok-react'

class TokBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      connection: 'Connecting',
      publishVideo: false
    }

    this.sessionEventHandlers = {
      sessionConnected: () => {
        this.setState({connection: 'Connected'})
      },
      sessionDisconnected: () => {
        this.setState({connection: 'Disconnected'})
      },
      sessionReconnected: () => {
        this.setState({connection: 'Reconnected'})
      },
      sessionReconnecting: () => {
        this.setState({connection: 'Reconnecting'})
      }
    }

    this.publisherEventHandlers = {
      accessDenied: () => {
        console.log('User denied access to media source')
      },
      streamCreated: () => {
        console.log('Publisher stream created')
      },
      streamDestroyed: ({reason}) => {
        console.log(`Publisher stream destroyed because: ${reason}`)
      }
    }

    this.subscriberEventHandlers = {
      videoEnabled: () => {
        console.log('Subscriber video enabled')
      },
      videoDisabled: () => {
        console.log('Subscriber video disabled')
      }
    }
  }

  ref = test => {
    this.test = test
  }

  onSessionError = error => {
    this.setState({error})
  }

  onPublish = () => {
    console.log('Publish Success')
  }

  onPublishError = error => {
    this.setState({error})
  }

  onSubscribe = () => {
    console.log('Subscribe Success')
  }

  onSubscribeError = error => {
    this.setState({error})
  }

  toggleVideo = () => {
    this.setState({publishVideo: !this.state.publishVideo})
  }

  render() {
    // const {name, apiKey, session, token} = this.props.credentials
    const {publishVideo} = this.state
    return this.props.credentials.apiKey ? (
      <div align="center" className="scrollTok" id="dots">
        <OTSession
          apiKey={this.props.credentials.apiKey}
          sessionId={this.props.credentials.session}
          token={this.props.credentials.token}
          onError={this.onSessionError}
          eventHandlers={this.sessionEventHandlers}
        >
          <button
            type="button"
            className="button is-warning"
            id="videoButton"
            onClick={this.toggleVideo}
          >
            {publishVideo ? 'Disable' : 'Enable'} Video
          </button>
          <div id="publisher">
            <OTPublisher
              properties={{
                publishVideo,
                width: 200,
                height: 150,
                name: this.props.credentials.name,
                style: {nameDisplayMode: 'on'}
              }}
              onPublish={this.onPublish}
              onError={this.onPublishError}
              eventHandlers={this.publisherEventHandlers}
            />
          </div>
          <OTStreams>
            <OTSubscriber
              properties={{
                width: 150,
                height: 150,
                style: {nameDisplayMode: 'on'}
              }}
              onSubscribe={this.onSubscribe}
              onError={this.onSubscribeError}
              eventHandlers={this.subscriberEventHandlers}
            />
          </OTStreams>
        </OTSession>
      </div>
    ) : (
      <div />
    )
  }
}

const mSTP = state => ({
  credentials: state.roomReducer
})

export default connect(mSTP)(TokBox)
