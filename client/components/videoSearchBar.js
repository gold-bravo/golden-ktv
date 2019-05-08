import React, {Component} from 'react'
import VideoPlayer from './videoPlayer'
import axios from 'axios'
import socket from '../socket'
import VideoQueue from './VideoQueue'

class VideoSearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchWords: '',
      videoData: [],
      curTime: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleEnd = this.handleEnd.bind(this)
  }
  componentDidMount() {
    // prob don't need now
    // socket.on('playing', data => this.setState({videoData: data}))
    socket.on('welcome', (data, time) => {
      if (data) {
        this.setState({videoData: data, curTime: time})
      }
    })
    socket.on('update queue', data => {
      this.setState({videoData: data})
    })
  }
  handleEnd() {
    this.setState({
      videoData: this.state.videoData.slice(1),
      curTime: null
    })
    socket.emit('end', this.state.videoData, this.props.room)
  }

  // Changes this.state.searchWords when user inputs a search word
  handleChange(e) {
    this.setState({
      searchWords: e.target.value
    })
  }

  // Changes the state when user clicks submit
  // Passes this.state.searchWords into Youtube Api to retrieve the top five videos
  // Obtains the videoId and resets this.state.videoId
  async handleClick() {
    const KEY = await axios.get('/api/youtubeapi')
    const youtube = await axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3',
      params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY.data
      }
    })
    const {data} = await youtube.get('/search', {
      params: {
        q: this.state.searchWords + ` karaoke`
      }
    })
    // Uncomment to check how the data looks like from Youtube API
    // console.log(data)
    // console.log(data.items[0].snippet.title)
    // Checking to see the Search returned valid videoid
    if (data.items[0].id.videoId) {
      this.setState({
        videoData: this.state.videoData.concat({
          id: data.items[0].id.videoId,
          title: data.items[0].snippet.title
        })
      })
      socket.emit('queue added', this.state.videoData, this.props.room)
    }
  }

  render() {
    return (
      <div className="video-searchbar">
        <input placeholder="Start search here" onChange={this.handleChange} />
        <button type="button" onClick={this.handleClick}>
          Submit
        </button>
        <VideoPlayer
          data={this.state.videoData}
          handleEnd={this.handleEnd}
          curTime={this.state.curTime}
          roomId={this.props.room}
        />
        <VideoQueue data={this.state.videoData} />
      </div>
    )
  }
}

export default VideoSearchBar
