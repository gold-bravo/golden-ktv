import React, { Component } from 'react';

const VideoPlayer = (props) => {

    const videoSrc = `https://www.youtube.com/embed/${props.videoId}?autoplay=1`

    return (
        <div>
            <iframe title='video player' style={{pointerEvents: 'none'}} src={videoSrc} />
        </div>
    )

}

export default VideoPlayer