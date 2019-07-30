import React from 'react'

const VideoResults = props => {
  const {data, handleClick} = props
  return (
    <div align="center">
      {data.map(video => {
        return (
          <div key={video.etag} onClick={() => handleClick(video)}>
            <img src={video.snippet.thumbnails.medium.url} />
            <br />
            {video.snippet.title}
          </div>
        )
      })}
    </div>
  )
}

export default VideoResults
