import React, {Component} from 'react'
import {setRoom} from '../store/roomReducer'
import {connect} from 'react-redux'
import axios from 'axios'
import {Button} from 'react-bulma-components/full'

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
      session: data.sessionId,
      token: data.token,
      apiKey: data.KEY
    })

    this.setState({sessionId: data.sessionId})
    console.log('handling stuff', this.state)
    this.props.history.push(`/room/${this.state.room}`)
  }
  render() {
    return (
      <div className="roomFormBG">
        {/* <img src='./images/golden-ktv-bg.jpg' width='100' /> */}
        <form onSubmit={this.handleSubmit}>
          <div className="roomForm">
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
              placeholder="Name"
            />
            <input
              name="room"
              type="text"
              value={this.state.room}
              onChange={this.handleChange}
              placeholder="Room"
              font="new-led"
            />
            <input
              type="submit"
              value="Enter"
              className="button is-primary is-rounded is-warning"
            />
          </div>
        </form>
      </div>
    )
  }
}

const mDTP = dispatch => ({
  setRoom: roomInfo => dispatch(setRoom(roomInfo))
})

export default connect(null, mDTP)(RoomForm)
