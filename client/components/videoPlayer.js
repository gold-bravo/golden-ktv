import React, { Component } from 'react';
import axios from 'axios';

// Youtube Data Api
const KEY ='AIzaSyCjL5n1rCIKqzIQTjt4I6at87Y5Y91JunU';

// Youtube Data Api axios call
const youtube = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY
    }
})

class VideoPlayer extends Component {

    render () {

        return (
            <div className='video player'>
            </div>
        )
    }

}