import React from 'react'

const VideoQueue = props => {
  const {data} = props
  return data.map(video => {
    return (
      <div key={video.id}>
        <img src={video.img} />
        <br />
        {video.title}
        <hr />
      </div>
    )
  })
}

export default VideoQueue
