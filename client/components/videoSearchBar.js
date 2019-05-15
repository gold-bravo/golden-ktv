import React, {Component} from 'react'
import VideoPlayer from './videoPlayer'
import axios from 'axios'
import socket from '../socket'
import VideoQueue from './VideoQueue'
import VideoResults from './videoResults'
import ChatBox from './ChatBox'
import UserList from './UserList'
import Tokbox from './tokbox'

class VideoSearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchWords: '',
      videoData: [],
      videoResults: [],
      curTime: null,
      userId: '',
      isHost: false,
      users: []
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
    //TODO:Possibly adding socket.id to state as userId
    socket.on('welcome', (data, time) => {
      console.log(
        'in welcome, if null means first visit or video has not played',
        data,
        time
      )
      if (data) {
        this.setState({videoData: data, curTime: time})
      }
    })
    // STEP ONE: EMIT SUCCESSFUL VISIT TO THE ROOM
    socket.emit('success', this.props.room)
    //should you need to update the queue due to a song ending, it should reset the time for others too
    socket.on('update', (data, msg, userArr) => {
      if (data) {
        this.setState({videoData: data})
      }
      if (msg) {
        this.setState({curTime: null})
      }
      if (userArr) {
        this.setState({users: userArr})
      }
    })
    socket.on('you are the host', () => {
      console.log('U DA HOST')
      this.setState({isHost: true})
    })

    socket.on('send id', (id, usersArr) => {
      console.log(id)
      this.setState({userId: id, users: usersArr})
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
    //only allow search when you have filled in the searchword
    if (this.state.searchWords) {
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
  }

  // Adds the clicked videoResult into the queue
  async handleClick(video) {
    const newQueueItem = {
      id: video.id.videoId,
      title: video.snippet.title,
      img: video.snippet.thumbnails.default.url,
      userId: this.state.userId
    }

    await this.setState(state => {
      return {videoData: [...state.videoData, newQueueItem]}
    })

    this.setState({
      videoResults: []
    })
    socket.emit('queue added', this.state.videoData, this.props.room)
  }

  render() {
    return (
      <div className="container">
        <div id="left-sidebar">
          <input
            type="text"
            placeholder="search here"
            onChange={this.handleChange}
          />
          <button
            type="button"
            className="button is-warning"
            onClick={this.handleSearch}
          >
            search
          </button>
          <VideoResults
            data={this.state.videoResults}
            handleClick={this.handleClick}
          />
          <VideoQueue data={this.state.videoData} />
        </div>
        <div id="main-player">
          <VideoPlayer
            data={this.state.videoData}
            handleSkipEnd={this.handleSkipEnd}
            curTime={this.state.curTime}
            roomId={this.props.room}
            userId={this.state.userId}
            isHost={this.state.isHost}
          />
        </div>

        <div id="right-sidebar">
          {/* <UserList isHost={this.state.isHost} users={this.state.users} /> */}
          {/* {this.props.room.apiKey ? */}
          <Tokbox />
          {/* : <div />} */}
          <ChatBox />
        </div>
      </div>
    )
  }
}

export default VideoSearchBar
