import React from 'react'

const PlayerButton = props => {
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
      {props.isHost ? (
        <>
          <button
            type="button"
            className="button is-warning"
            onClick={props.vidId && props.onSkip}
          >
            NEXT SONG
          </button>
        </>
      ) : (
        <></>
      )}
      {/*only render the btn if there is nothing on the queue or if you are the host or its your turn to play*/}
      {!props.data[0] || props.displayPlayBtn ? (
        <>
          <button
            type="button"
            className="button is-warning"
            onClick={() => props.player.getInternalPlayer().playVideo()}
          >
            PLAY
          </button>
        </>
      ) : (
        <></>
      )}
      <button
        type="button"
        className="button is-warning"
        onClick={props.onLeaveRoom}
      >
        LEAVING ROOM
      </button>
      <strong>Volume</strong>
      <input
        type="range"
        min={0}
        max={1}
        step="any"
        value={props.volume}
        onChange={props.setVolume}
      />

      <div>
        <strong>Duration</strong>
        <progress max={1} value={props.played} />
      </div>
    </div>
  )
}

export default PlayerButton
