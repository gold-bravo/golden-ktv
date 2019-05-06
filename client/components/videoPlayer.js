import React, {Component} from 'react'
import YouTube from 'react-youtube'
import socket from '../socket'

class VideoPlayer extends Component {
  constructor(props) {
    super(props)
    this.onReady = this.onReady.bind(this)
    this.player = []
  }

  //need custom logics
  onReady(e) {
    if (this.props.data[0] && this.props.curTime) {
      const timeNow = (Date.now() - this.props.curTime) / 1000
      console.log('please work', timeNow)
      console.log(this.props.data[0].id)
      this.player = e.target
      // e.target.seekTo(timeNow).playVideo()
      this.player.playVideo()
      console.log(e.target.getCurrentTime())
    }
    // console.log(this.player)
    // this.props.data[0] && this.props.data[0].id
    //   ? e.target.playVideo()
    //   : console.log('waiting')
    // socket.on('playing', () => {
    //   e.target.playVideo()
    // })
    // console.log(e.target.getVideoData(), this.props.data[0].id)
    // if (this.props.data[0] && this.props.data[0].id) {
    //   e.target.loadVideoById(this.props.data[0].id)
    //   console.log(e.target.getVideoUrl())
    //   e.target.playVideo()
    // }
    // this.onReady
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
          onPlay={e => {
            // if (this.props.curTime) {
            //   const timeNow = (Date.now() - this.props.curTime) / 1000
            //   console.log(timeNow)
            //   e.target.seekTo(timeNow)
            // }
            console.log(e.target.getCurrentTime())
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
