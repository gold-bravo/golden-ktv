import React from 'react'

const VideoQueue = props => {
  return props.data.map(video => {
    return (
      <div key={video.id}>
        <li>
          <img src={video.img} />
          {video.title}
        </li>
      </div>
    )
  })
}

export default VideoQueue
