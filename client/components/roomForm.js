import React, {Component} from 'react'
import {setRoom} from '../store/roomReducer'
import {connect} from 'react-redux' 

class RoomForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      room: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    //PROBABLY WANT TO SOCKET.EMIT HERE WITH MY ROOM NUMBER
    this.props.setRoom(this.state.room)
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
  setRoom: (roomNum) => dispatch(setRoom(roomNum))
})

export default connect(null, mDTP)(RoomForm)
