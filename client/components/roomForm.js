import React, {Component} from 'react'
import {setRoom} from '../store/roomReducer'
import {connect} from 'react-redux'
import axios from 'axios'

class RoomForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      room: '',
      sessionId: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  async handleSubmit(event) {
    event.preventDefault()
    //PROBABLY WANT TO SOCKET.EMIT HERE WITH MY ROOM NUMBER

    const {data} = await axios.put('/api/room', {
      roomNum: this.state.room,
      name: this.state.name
    })

    await this.props.setRoom({
      roomNum: this.state.room,
      session: this.state.sessionId,
      token: data.token,
      apiKey: data.KEY
    })

    console.log('handling stuff', this.state)
    this.setState({sessionId: data.sessionId})
    this.props.history.push(`/room/${this.state.room}`)
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Room:
          <input
            name="room"
            type="text"
            value={this.state.room}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Enter" />
      </form>
    )
  }
}

const mDTP = dispatch => ({
  setRoom: roomInfo => dispatch(setRoom(roomInfo))
})

export default connect(null, mDTP)(RoomForm)
