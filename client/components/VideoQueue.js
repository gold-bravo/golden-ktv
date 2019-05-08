import React from 'react'

const VideoQueue = props => {
  console.log('inside video queue', props)
  return (
    <>
      {props.data.map(video => {
        return (
        <div>
          <li key={video.id}>
          <img src={video.img} />
          {video.title}</li>
        </div>
      )})}
    </>
  )
}

export default VideoQueue
