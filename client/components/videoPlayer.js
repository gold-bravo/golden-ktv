import React, {Component} from 'react'
import socket from '../socket'
import ReactPlayer from 'react-player'

class VideoPlayer extends Component {
  constructor(props) {
    console.log(props, 'in videoPlayer')
    super(props)
    this.onStart = this.onStart.bind(this)
    this.onReady = this.onReady.bind(this)
  }
  componentDidMount() {
    socket.on('playing', () => {
      this.player.getInternalPlayer().playVideo()
    })
  }
  //This allows the player to be manipulated by React buttons
  ref = player => {
    this.player = player
  }
  //TODO: This method is running twice for some reason rn
  onStart() {
    console.log('starting now', this.props.data)
    socket.emit('play', this.props.data, Date.now(), this.props.roomId)
  }

  onReady() {
    if (this.props.curTime && this.props.data[0]) {
      const timeNow = (Date.now() - this.props.curTime) / 1000
      console.log('working', this.props.data[0])
      console.log(timeNow)
      this.player.seekTo(parseFloat(timeNow))
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
              : 'https://www.youtube.com/watch?v=yKNxeF4KMsY'
          }
          config={{
            youtube: {
              playerVars: {controls: 1}
            }
          }}
          ref={this.ref}
          onStart={this.onStart}
          onReady={this.onReady}
          onEnded={this.props.handleEnd}
        />
      </div>
    )
  }
}

export default VideoPlayer
