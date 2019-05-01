import React, { Component } from 'react';
import VideoPlayer from './videoPlayer';
import axios from 'axios';

// Youtube API Key
const KEY ='AIzaSyCjL5n1rCIKqzIQTjt4I6at87Y5Y91JunU';

// Youtube API axios call
const youtube = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY
    }
})

class VideoSearchBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchWords: '',
            videoId: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    // Changes this.state.searchWords when user inputs a search word 
    handleChange (e) {
        this.setState({
            searchWords: e.target.value
        })
    }

    // Changes the state when user clicks submit
    // Passes this.state.searchWords into Youtube Api to retrieve the top five videos
    // Obtains the videoId and resets this.state.videoId
    async handleClick () {
        console.log('checking', this.state.searchWords)
        const { data } = await youtube.get('/search', {
            params: {
                q: this.state.searchWords
            }
        })
        this.setState({
            videoId: data.items[0].id.videoId
        })
    }

    render () {

        return (
            <div className='video searchbar'>
                <input placeholder='Start search here' onChange={this.handleChange}></input>
                <button type='button' onClick={() => this.handleClick()}>Submit</button>
                <VideoPlayer videoId={this.state.videoId} />
            </div>
        )
    }
}

export default VideoSearchBar