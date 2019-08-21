import React, {Component} from 'react'
import socket from '../socket'
import ReactPlayer from 'react-player'
import {withRouter} from 'react-router-dom'
import PlayerButton from './PlayerButton'
import {connect} from 'react-redux'

class VideoPlayer extends Component {
  constructor(props) {
    super(props)
    this.onStart = this.onStart.bind(this)
    this.onSeek = this.onSeek.bind(this)
    this.onReady = this.onReady.bind(this)
    this.state = {
      played: 0,
      volume: 0.6,
      skipping: false
    }
  }
  //This allows the player to be manipulated by React buttons
  ref = player => {
    this.player = player
  }

  onProgress = e => {
    this.setState({played: e.played})
  }

  setVolume = e => {
    this.setState({volume: parseFloat(e.target.value)})
  }

  onBufferEnd = () => {
    if (this.state.skipping) {
      this.setState({skipping: false})
      this.player.seekTo(this.player.getDuration() - 1)
    }
  }

  onSkip = () => {
    const isMyTurn =
      (this.props.data[0] && this.props.data[0].userId) === this.props.userId
    console.log('on skip', isMyTurn)
    //skipping to the next song only if it your turn or you are the host
    if (isMyTurn || this.props.isHost) {
      if (this.player.getInternalPlayer().getPlayerState() === 1) {
        this.player.seekTo(this.player.getDuration() - 1)
      } else {
        this.setState({skipping: true})
        this.player.getInternalPlayer().playVideo()
      }
      this.setState({played: 0})
    }
  }

  onStart() {
    //if there is something in the queue do the following
    //preventing uneccessary global update when you are playing the default vid
    if (this.props.data[0]) {
      if (!this.props.curTime) {
        socket.emit('play', this.props.data, Date.now(), this.props.roomId)
      } else {
        const timeNow = (Date.now() - this.props.curTime) / 1000
        this.player.getInternalPlayer().seekTo(timeNow)
      }
    }
  }

  onReady() {
    //setting duration back to 0 on ready
    if (this.state.played) this.setState({played: 0})
    if (this.props.curTime) {
      this.player.getInternalPlayer().playVideo()
    }
    socket.on('playing', () => {
      this.player.getInternalPlayer().playVideo()
    })
  }

  onPause = () => {
    this.player.getInternalPlayer().pauseVideo()
  }

  onSeek = direction => {
    if (this.player.getInternalPlayer().getPlayerState() === 1) {
      const curTime = this.player.getInternalPlayer().getCurrentTime()
      const seekAheadOrBack = direction === '+' ? curTime + 1 : curTime - 1
      this.player.getInternalPlayer().seekTo(seekAheadOrBack)
    }
  }
  onLeaveRoom = () => {
    const filteredData = this.props.data.filter(
      item => item.userId !== this.props.userId
    )

    socket.emit(
      'leaving',
      filteredData,
      this.props.roomId,
      this.props.credentials.name
    )
    this.props.history.push('/')
    //when you leave your room, all the songs that you queued up will be gone as well
    //TODO:What if someone tries to leave the room when it is turn to sing? or if you are the host?
  }

  render() {
    const vidId = this.props.data[0] && this.props.data[0].id
    //show display btn only if you are the host or it's your turn to sing
    const isMyTurn =
      (this.props.data[0] && this.props.data[0].userId) === this.props.userId
    const displayPlayBtn = isMyTurn || this.props.isHost
    return (
      <div className="videoPlayer" align="center">
        <div className="player-wrapper">
          <ReactPlayer
            style={{pointerEvents: 'none'}}
            className="react-player"
            width="100%"
            height="100%"
            url={
              vidId
                ? `https://www.youtube.com/watch?v=${vidId}`
                : 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
            }
            controls={true}
            ref={this.ref}
            onStart={this.onStart}
            onReady={this.onReady}
            volume={this.state.volume}
            onProgress={this.onProgress}
            onError={this.props.handleSkipEnd}
            //when a song ends, queue will skip to next only if you are host or if it was your turn to sing
            onEnded={() => {
              displayPlayBtn && this.props.handleSkipEnd()
            }}
            onBufferEnd={this.onBufferEnd}
          />
        </div>
        <PlayerButton
          {...this.state}
          {...this.props}
          player={this.player}
          setVolume={this.setVolume}
          onSeek={this.onSeek}
          onPause={this.onPause}
          onSkip={this.onSkip}
          onLeaveRoom={this.onLeaveRoom}
        />
      </div>
    )
  }
}

const mSTP = state => ({
  credentials: state.roomReducer
})

export default connect(mSTP)(withRouter(VideoPlayer))
