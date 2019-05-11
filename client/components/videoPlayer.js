import React, {Component} from 'react'
import socket from '../socket'
import ReactPlayer from 'react-player'
import {withRouter} from 'react-router-dom'


class VideoPlayer extends Component {
  constructor(props) {
    console.log(props, 'in videoPlayer')
    super(props)
    this.onStart = this.onStart.bind(this)
    this.seek = this.seek.bind(this)
    this.onReady = this.onReady.bind(this)
    // this.onPlay = this.onPlay.bind(this)
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
  leaveRoom = () => {
    const filteredData = this.props.data.filter(item => item.userId !== this.props.userId)
    socket.emit('leaving', filteredData, this.props.roomId)
    this.props.history.push('/')
    //What if someone tries to leave the room when it is turn to sing? or if you are the host?
  }

  render() {
    const vidId = this.props.data[0] && this.props.data[0].id

    //show display btn only if you are the host or it's your turn to sing
    const yourTurn = this.props.data[0] && this.props.data[0].userId === this.props.userId
    const displayPlayBtn = yourTurn || this.props.isHost

    return (
      <div className="player-wrapper">
        <button type="button" onClick={this.handlePause}>
          Pause
        </button>
        <button type="button" onClick={() => this.seek('-')}>
          --
        </button>
        <button type="button" onClick={() => this.seek('+')}>
          ++
        </button>
        {
          this.props.isHost
          ?
          <>
          <button
          type="button"
          onClick={() => {
            if (this.player.getInternalPlayer().getPlayerState() === 1) {
              this.player.seekTo(this.player.getDuration() - 1)
            } else {
              console.log('in else')
              setTimeout(() => {
                this.player.seekTo(this.player.getDuration() - 1)
              }, 1000)
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
          </>
          :
          <></>
        }
        {
          displayPlayBtn
          ?
          <>
          <button
          type="button"
          onClick={() => this.player.getInternalPlayer().playVideo()}
        >
          PLAY
        </button>
          </>
          :
          <></>
        }
        <button onClick={this.leaveRoom}>
          LEAVING ROOM
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
          onError={this.props.handleSkipEnd}
          onEnded={() => {
            if(displayPlayBtn){
              this.props.handleSkipEnd()
            }
          }}
        />
      </div>
    )
  }
}

export default withRouter(VideoPlayer)

