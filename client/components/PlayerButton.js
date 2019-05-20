import React from 'react'

const PlayerButton = props => {
  const isMyTurn = (props.data[0] && props.data[0].userId) === props.userId
  const allowPlay = isMyTurn || props.isHost
  return (
    <div id="vol-dur">
      <button
        type="button"
        className="button is-warning"
        onClick={props.onPause}
      >
        Pause
      </button>
      <button
        type="button"
        className="button is-warning"
        onClick={() => props.onSeek('-')}
      >
        &#x23ea;
      </button>
      <button
        type="button"
        className="button is-warning"
        onClick={() => props.onSeek('+')}
      >
        &#x23e9;
      </button>
      <button
        type="button"
        className="button is-warning"
        onClick={props.onSkip}
      >
        NEXT SONG
      </button>
      <button
        type="button"
        className="button is-warning"
        onClick={() => {
          /*only let you play if there is nothing on the queue or if you are the host or its your turn to play*/
          console.log('inside play btn', !props.data.length || allowPlay)
          if (!props.data.length || allowPlay) {
            props.player.getInternalPlayer().playVideo()
          }
        }}
      >
        PLAY
      </button>
      <button
        type="button"
        className="button is-warning"
        onClick={props.onLeaveRoom}
      >
        LEAVING ROOM
      </button>
      <div id="volume-duration">
        <strong>Volume</strong>
        <div id="volume-input">
          <input
            style={{padding: 0, paddingBottom: '5px'}}
            type="range"
            min={0}
            max={1}
            step="any"
            value={props.volume}
            onChange={props.setVolume}
          />
        </div>

        <strong id="duration">Duration</strong>
        <progress id="duration-progress" max={1} value={props.played} />
      </div>
    </div>
  )
}

export default PlayerButton
