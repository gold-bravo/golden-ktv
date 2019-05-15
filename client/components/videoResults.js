import React, {Component} from 'react'

class VideoResults extends Component {
  render() {
    return (
      <div className="search-res">
        {this.props.data.map(video => {
          return (
            <div key={video.etag} onClick={() => this.props.handleClick(video)}>
              <img src={video.snippet.thumbnails.medium.url} />
              <br />
              {video.snippet.title}
            </div>
          )
        })}
      </div>
    )
  }
}

export default VideoResults
