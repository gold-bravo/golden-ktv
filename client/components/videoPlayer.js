import React, {Component} from 'react'
import YouTube from 'react-youtube'
import socket from '../socket'

class VideoPlayer extends Component {
  constructor(props) {
    super(props)
    this.onReady = this.onReady.bind(this)
    this.handleStateChange = this.handleStateChange.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
  }

  onReady(event) {
    const player = event.target
    this.props.videoId
      ? // && this.props.roomId
        player.playVideo()
      : console.log('waiting')
  }

  handleStateChange(event) {
    const player = event.target
    console.log(player.getCurrentTime())
  }

  handlePlay() {
    let roomInfo = {
      videoId: this.props.videoId,
      roomId: this.props.roomId
    }
    socket.emit('play', roomInfo)
  }

  handleSync() {}

  componentDidMount() {
    socket.on('newGuy', (id, roomNumber) => {})
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
          onPlay={this.handlePlay}
          onReady={this.onReady}
          onStateChange={this.handleStateChange}
        />
        <button type="button" onClick={this.handleSync}>
          Sync
        </button>
      </div>
    )
  }
}

export default VideoPlayer
