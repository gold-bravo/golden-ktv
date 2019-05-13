import React, {Component} from 'react'
import socket from '../socket'
import ReactPlayer from 'react-player'

class VideoPlayer extends Component {
  constructor(props) {
    super(props)
    this.onStart = this.onStart.bind(this)
    // this.onPlay = this.onPlay.bind(this)
    this.seek = this.seek.bind(this)
    this.onReady = this.onReady.bind(this)
  }
  //This allows the player to be manipulated by React buttons
  ref = player => {
    this.player = player
  }
  //TODO: This method is running twice for some reason rn
  onStart() {
    if (!this.props.curTime) {
      console.log('starting now', this.props.data)
      socket.emit('play', this.props.data, Date.now(), this.props.roomId)
    } else {
      console.log('PUSH ME TO CURRENT TIME')
      const timeNow = (Date.now() - this.props.curTime) / 1000
      this.player.getInternalPlayer().seekTo(timeNow)
    }
  }
  onReady() {
    if (this.props.curTime) {
      this.player.getInternalPlayer().playVideo()
    }
    socket.on('playing', () => {
      this.player.getInternalPlayer().playVideo()
    })
  }
  handlePause = () => {
    this.player.getInternalPlayer().pauseVideo()
  }

  seek = direction => {
    if (this.player.getInternalPlayer().getPlayerState() === 1) {
      const curTime = this.player.getInternalPlayer().getCurrentTime()
      const seekAheadOrBack = direction === '+' ? curTime + 1 : curTime - 1
      this.player.getInternalPlayer().seekTo(seekAheadOrBack)
    }
  }
  render() {
    const vidId = this.props.data[0] && this.props.data[0].id
    return (
      <div className="player-wrapper">
        <button type="button" onClick={this.handlePause}>
          Stop
        </button>
        <button type="button" onClick={() => this.seek('+')}>
          ++
        </button>
        <button type="button" onClick={() => this.seek('-')}>
          --
        </button>
        <button
          type="button"
          onClick={() => {
            if (this.player.getInternalPlayer().getPlayerState() === 1) {
              this.player.seekTo(this.player.getDuration() - 1)
            } else {
              setTimeout(() => {
                this.player.seekTo(this.player.getDuration() - 1)
              }, 800)
              this.player.getInternalPlayer().playVideo()
            }
          }}
        >
          NEXT SONG
        </button>
        <button
          type="button"
          onClick={() => this.player.seekTo(this.player.getDuration() - 5)}
        >
          Take Me To End
        </button>
        <button
          type="button"
          onClick={() => this.player.getInternalPlayer().playVideo()}
        >
          PLAY
        </button>
        <ReactPlayer
          style={{pointerEvents: 'none'}}
          className="react-player"
          // width="70%"
          // height="70%"
          url={
            vidId
              ? `https://www.youtube.com/watch?v=${vidId}`
              : 'https://www.youtube.com/watch?v=yKNxeF4KMsY'
          }
          controls={true}
          ref={this.ref}
          onStart={this.onStart}
          onReady={this.onReady}
          // volume={}
          // onPlay={this.onPlay}
          onError={this.props.handleSkipEnd}
          onEnded={this.props.handleSkipEnd}
        />
      </div>
    )
  }
}

export default VideoPlayer

//TODO: SKIP-BTN, SEEK+/- BTN, Manual START, Disable AutoPlay
