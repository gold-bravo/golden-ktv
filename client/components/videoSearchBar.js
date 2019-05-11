import React, {Component} from 'react'
import VideoPlayer from './videoPlayer'
import axios from 'axios'
import socket from '../socket'
import VideoQueue from './VideoQueue'
import VideoResults from './videoResults'

class VideoSearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchWords: '',
      videoData: [],
      videoResults: [],
      curTime: null,
      userId: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSkipEnd = this.handleSkipEnd.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    // prob don't need now
    // socket.on('playing', data => this.setState({videoData: data}))
    //STEP FOUR: Now the welcome is finally set.
    socket.on('welcome', (data, time, id) => {
      console.log('in welcome, if null means first visit', data, time)
      if (data) {
        this.setState({
          videoData: data,
          curTime: time,
          userId: id
        })
      }
    })
    // STEP ONE: EMIT SUCCESSFUL VISIT TO THE ROOM
    socket.emit('success', this.props.room)
    console.log('mounted')
    socket.on('update queue', data => {
      this.setState({videoData: data})
    })
    socket.on('send id', id => {
      console.log(id)
      this.setState({userId: id})
    })
  }
  componentWillUnmount() {
    socket.removeAllListeners()
  }
  handleSkipEnd() {
    //changed this to be a callback because VSCode was complaining
    this.setState(prevState => ({
      videoData: prevState.videoData.slice(1),
      curTime: null
    }))
    socket.emit('end', this.state.videoData, this.props.room)
  }

  // Changes this.state.searchWords when user inputs a search word
  handleChange(e) {
    this.setState({
      searchWords: e.target.value
    })
  }

  // Changes the state when user clicks SEARCH
  // Passes this.state.searchWords into Youtube Api to retrieve the top five videos
  // Obtains the videoId and resets this.state.videoId
  async handleSearch() {
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
        q: this.state.searchWords + ` karaoke -karafun -singkingkaraoke`
      }
    })
    // Uncomment to check how the data looks like from Youtube API
    // console.log(data)

    // Filters out the videos without a videoId
    const videoItems = data.items.filter(video => video.id.videoId)

    this.setState({
      videoResults: videoItems
    })
  }

  // Adds the clicked videoResult into the queue
  async handleClick(video) {
    console.log(this.state.userId)
    const newQueueItem = {
      id: video.id.videoId,
      title: video.snippet.title,
      img: video.snippet.thumbnails.default.url,
      userId: this.state.userId
    }

    await this.setState(state => {
      return {videoData: state.videoData.concat(newQueueItem)}
    })

    this.setState({
      videoResults: []
    })

    socket.emit('queue added', this.state.videoData, this.props.room)
  }

  render() {
    return (
      <div className="video-searchbar">
        <input placeholder="Start search here" onChange={this.handleChange} />
        <button type="button" onClick={this.handleSearch}>
          Search
        </button>
        <VideoPlayer
          data={this.state.videoData}
          handleSkipEnd={this.handleSkipEnd}
          curTime={this.state.curTime}
          roomId={this.props.room}
        />
        <VideoResults
          data={this.state.videoResults}
          handleClick={this.handleClick}
        />
        <VideoQueue data={this.state.videoData} />
      </div>
    )
  }
}

export default VideoSearchBar
