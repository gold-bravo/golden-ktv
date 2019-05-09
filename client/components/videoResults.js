import React, {Component} from 'react'

class VideoResults extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {this.props.data.map(video => {
          return (
            <div key={video.etag} onClick={() => this.props.handleClick(video)}>
              <img src={video.snippet.thumbnails.medium.url} />
              <h3>{video.snippet.title}</h3>
            </div>
          )
        })}
      </div>
    )
  }
}

export default VideoResults
