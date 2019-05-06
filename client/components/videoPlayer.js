import React, {Component} from 'react'
import YouTube from 'react-youtube'
import socket from '../socket'

class VideoPlayer extends Component {
  constructor(props) {
    super(props)
    this.onReady = this.onReady.bind(this)
  }

  onReady(e) {
    (this.props.videoId 
      // && this.props.roomId
      ) ? e.target.playVideo() : console.log('waiting')
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
    console.log('from videoplayer', this.props.roomId)
    return (
      <div>
        <YouTube
          videoId={this.props.videoId}

          opts={opts}
          //Added onPlayEventListener, emits msg when video starts playing
          onPlay={() => {
            let roomInfo = {videoId: this.props.videoId, roomId: this.props.roomId}
            socket.emit('play', roomInfo)

          }}
          onReady={this.onReady}
        />
      </div>
    )
  }
}

export default VideoPlayer
