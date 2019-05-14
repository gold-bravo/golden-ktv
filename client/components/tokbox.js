import React, {Component} from 'react'
import {connect} from 'react-redux'
import {OTSession, OTPublisher, OTStreams, OTSubscriber} from 'opentok-react'

//Remember to fill these fields before use!
// let apiKey = ''
// let token = ''
// let sessionId = ''

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
    return (
      <div>
        <OTSession
          apiKey={this.props.credentials.apiKey}
          sessionId={this.props.credentials.session}
          token={this.props.credentials.token}
          onError={this.onSessionError}
          eventHandlers={this.sessionEventHandlers}
        >
          <button type="button" id="videoButton" onClick={this.toggleVideo}>
            {publishVideo ? 'Disable' : 'Enable'} Video
          </button>
          <div id="publisher">
            <OTPublisher
              ref={e => (this.pub = e)}
              properties={{
                publishVideo,
                width: 150,
                height: 150,
                name: this.props.credentials.name
              }}
              onPublish={this.onPublish}
              onError={this.onPublishError}
              eventHandlers={this.publisherEventHandlers}
            />
          </div>
          <OTStreams>
            <OTSubscriber
              ref={e => (this.sub = e)}
              properties={{width: 150, height: 150}}
              onSubscribe={this.onSubscribe}
              onError={this.onSubscribeError}
              eventHandlers={this.subscriberEventHandlers}
            />
          </OTStreams>
        </OTSession>
      </div>
    )
  }
}

const mSTP = state => ({
  credentials: state.roomReducer
})

export default connect(mSTP)(TokBox)
