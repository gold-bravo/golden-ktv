import React, {Component} from 'react'
import socket from '../socket'
import ReactPlayer from 'react-player'

class VideoPlayer extends Component {
  constructor(props) {
    super(props)
    this.onReady = this.onReady.bind(this)
  }
  componentDidMount() {
    socket.on('playing', () => {
      if (this.props.data[0]) {
        this.player.getInternalPlayer().playVideo()
      }
    })
  }
  ref = player => {
    this.player = player
  }
  onReady() {
    if (this.props.data[0] && this.props.curTime) {
      const timeNow = (Date.now() - this.props.curTime) / 1000
      this.player.seekTo(timeNow)
      this.player.getInternalPlayer().playVideo()
    }
  }
  handleStop = () => {
    this.player.getInternalPlayer().stopVideo()
  }
  render() {
    const vidId = this.props.data[0] && this.props.data[0].id
    return (
      <div className="player-wrapper">
        <button type="button" onClick={this.handleStop}>
          Stop
        </button>
        {vidId ? (
          <ReactPlayer
            className="react-player"
            // width="70%"
            // height="70%"
            url={`https://www.youtube.com/watch?v=${vidId}`}
            config={{
              youtube: {
                playerVars: {controls: 1}
              }
            }}
            ref={this.ref}
            onReady={this.onReady}
            onPlay={() => {
              if (this.props.curTime) {
                socket.emit('play', this.props.data)
              } else {
                socket.emit('play', this.props.data, Date.now())
              }
            }}
            onEnded={this.props.handleEnd}
          />
        ) : (
          <h1>Add Some Music</h1>
        )}
      </div>
    )
  }
}

export default VideoPlayer
