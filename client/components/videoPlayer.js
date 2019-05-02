import React, {Component} from 'react'
import axios from 'axios'
import YouTube from 'react-youtube'

class VideoPlayer extends Component {
  constructor() {
    super()
    // let videoSrc = `https://www.youtube.com/embed/${
    //   this.props.videoId
    // }?autoplay=0`
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    }
    return (
      <div>
        {/* <iframe
        title="video player"
        style={{pointerEvents: 'none'}}
        src={videoSrc}
      /> */}
        <YouTube videoId="2g811Eo7K8U" opts={opts} />
      </div>
    )
  }
}

export default VideoPlayer
