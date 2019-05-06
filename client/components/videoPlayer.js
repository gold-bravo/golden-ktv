import React, {Component} from 'react'
import YouTube from 'react-youtube'
import socket from '../socket'

class VideoPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      curTime: null
    }
    this.onReady = this.onReady.bind(this)
  }
  componentDidMount() {
    socket.on('welcome', (data, time) => {
      if (data) {
        this.setState({curTime: time})
      }
    })
  }

  //need custom logics
  // e.target.getPlayerState() !== 1 &&
  onReady(e) {
    if (this.props.data[0] && this.state.curTime) {
      const timeNow = (Date.now() - this.state.curTime) / 1000
      e.target.seekTo(timeNow)
      this.setState({curTime: null})
    }
    // this.props.data[0] && this.props.data[0].id
    //   ? e.target.playVideo()
    //   : console.log('waiting')
    socket.on('playing', () => {
      e.target.playVideo()
    })
  }
  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    }
    return (
      <>
        <YouTube
          videoId={this.props.data[0] && this.props.data[0].id}
          opts={opts}
          //Added onPlayEventListener, emits msg when video starts playing
          onPlay={() => {
            socket.emit('play', this.props.data, Date.now())
          }}
          onEnd={this.props.handleEnd}
          onReady={this.onReady}
        />
      </>
    )
  }
}

export default VideoPlayer
