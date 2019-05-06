import React, {Component} from 'react'
import YouTube from 'react-youtube'
import socket from '../socket'

class VideoPlayer extends Component {
  constructor(props) {
    super(props)
    this.onReady = this.onReady.bind(this)
  }

  //need custom logics
  onReady(e) {
    if (this.props.data[0] && this.props.curTime) {
      const timeNow = (Date.now() - this.props.curTime) / 1000
      console.log('please work', timeNow)
      console.log(this.props.data[0].id)
      e.target.seekTo(timeNow)
      e.target.playVideo()
      // this.setState({curTime: null})
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
