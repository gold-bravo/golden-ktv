import React, {Component} from 'react'
import YouTube from 'react-youtube'
import socket from '../socket'

class VideoPlayer extends Component {
  constructor(props) {
    super(props)
    this.onReady = this.onReady.bind(this)
  }
  onReady(e) {
    this.props.videoId ? e.target.playVideo() : console.log('waiting')
  }
  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    }
    return (
      <div>
        <YouTube
          videoId={this.props.videoId}
          opts={opts}
          //Added onPlayEventListener, emits msg when video starts playing
          onPlay={() => {
            socket.emit('play', this.props.videoId)
          }}
          onReady={this.onReady}
        />
      </div>
    )
  }
}

export default VideoPlayer
