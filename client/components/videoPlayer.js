import React, {Component} from 'react'
import socket from '../socket'
import ReactPlayer from 'react-player'

class VideoPlayer extends Component {
  constructor(props) {
    super(props)
    this.onReady = this.onReady.bind(this)
    this.onPlay = this.onPlay.bind(this)
  }
  ref = player => {
    this.player = player
  }
  onReady() {
    if (this.props.data[0] && this.props.curTime) {
      console.log('hello')
      const timeNow = (Date.now() - this.props.curTime) / 1000
      //   console.log('working')
      //   console.log(timeNow)
      // this.player.getInternalPlayer().seekTo(timeNow, true)
      this.player.getInternalPlayer().seekTo(timeNow)
      // this.player.getInternalPlayer().playVideo()
    }
    // else {
    // }
    socket.on('playing', () => {
      this.player.getInternalPlayer().playVideo()
    })
  }
  onPlay() {
    if (this.props.curTime) {
      const timeNow = (Date.now() - this.props.curTime) / 1000
      this.player.seekTo(timeNow)
    }
  }
  handlePause = () => {
    this.player.getInternalPlayer().pauseVideo()
  }
  //testing testing
  test = () => {
    const curTime = this.player.getInternalPlayer().getCurrentTime()
    this.player.getInternalPlayer().seekTo(curTime + 1)
  }
  //skip to next song
  //update local and backend state also
  test2 = () => {
    this.player.getInternalPlayer().loadVideoById(this.props.data[1].id)
  }

  render() {
    const vidId = this.props.data[0] && this.props.data[0].id
    socket.on('playing', () => console.log('I am playing'))
    return (
      <div className="player-wrapper">
        <button type="button" onClick={this.handlePause}>
          Stop
        </button>
        <button type="button" onClick={this.test}>
          TEST
        </button>
        <button type="button" onClick={this.test2}>
          NEXT
        </button>
        <ReactPlayer
          className="react-player"
          // width="70%"
          // height="70%"
          url={
            vidId
              ? `https://www.youtube.com/watch?v=${vidId}`
              : 'https://www.youtube.com/watch?v=N-E3Hyg7rh4'
          }
          config={{
            youtube: {
              playerVars: {controls: 1}
            }
          }}
          ref={this.ref}
          onReady={this.onReady}
          onStart={() => {
            socket.emit('play', this.props.data, Date.now(), this.props.roomId)
          }}
          onPlay={this.onPlay}
          onEnded={() => {
            this.props.handleEnd()
          }}
        />
      </div>
    )
  }
}

export default VideoPlayer
