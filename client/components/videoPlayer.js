import React, {Component} from 'react'
import socket from '../socket'
import ReactPlayer from 'react-player'

class VideoPlayer extends Component {
  constructor(props) {
    super(props)
    this.onStart = this.onStart.bind(this)
    this.onPlay = this.onPlay.bind(this)
    this.seek = this.seek.bind(this)
  }
  //This allows the player to be manipulated by React buttons
  ref = player => {
    this.player = player
  }
  //TODO: This method is running twice for some reason rn
  onStart() {
    console.log('starting now', this.props.data)
    socket.emit('play', this.props.data, Date.now(), this.props.roomId)
    if (this.props.curTime && this.props.data[0]) {
      const timeNow = (Date.now() - this.props.curTime) / 1000
      console.log('working', this.props.data[0])
      console.log(timeNow)
      this.player.seekTo(timeNow)
      this.player.getInternalPlayer().playVideo()
      this.player.getInternalPlayer()
    } else {
      socket.on('playing', () => {
        this.player.getInternalPlayer().playVideo()
      })
    }
  }
  onPlay() {
    // TODO: This does not work, it runs continously while video is playing
    // if (this.props.curTime && this.props.data[0]) {
    //   const timeNow = this.player.getCurrentTime()
    //   console.log('working', this.props.data[0])
    //   console.log(timeNow)
    //   this.player.seekTo(timeNow)
    //   this.player.getInternalPlayer().playVideo()
    // }
  }
  handlePause = () => {
    this.player.getInternalPlayer().pauseVideo()
  }
  //testing testing
  seek = direction => {
    const curTime = this.player.getInternalPlayer().getCurrentTime()
    const seekAheadOrBack = direction === '+' ? curTime + 1 : curTime - 1
    this.player.getInternalPlayer().seekTo(seekAheadOrBack)
  }
  //skip to next song
  //update local and backend state also
  // skipToNext = () => {
  //   this.player.getInternalPlayer().loadVideoById(this.props.data[1].id)
  // }

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
        <button type="button" onClick={this.props.handleSkipEnd}>
          NEXT SONG
        </button>
        <button
          type="button"
          onClick={() => this.player.seekTo(this.player.getDuration() - 10)}
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
              ? `www.youtube.com/watch?v=${vidId}`
              : 'www.youtube.com/watch?v=N-E3Hyg7rh4'
          }
          // config={{
          //   youtube: {
          //     playerVars: {controls: 0}
          //   }
          // }}
          controls={true}
          ref={this.ref}
          onStart={this.onStart}
          // volume={}
          // onStart={() => {
          //   console.log('starting now', this.props.data)
          //   socket.emit('play', this.props.data, Date.now(), this.props.roomId)
          // }}
          onPlay={this.onPlay}
          onEnded={this.props.handleSkipEnd}
        />
      </div>
    )
  }
}

export default VideoPlayer

//TODO: SKIP-BTN, SEEK+/- BTN, Manual START, Disable AutoPlay
