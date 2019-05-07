import React from 'react'

const VideoQueue = props => {
  return (
    <>
      {props.data.map(el => {
        return <li key={el.id}>{el.title}</li>
      })}
    </>
  )
}

export default VideoQueue
