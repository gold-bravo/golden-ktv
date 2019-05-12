import React, {Component} from 'react'
import {setRoom} from '../store/roomReducer'
import {connect} from 'react-redux'
import axios from 'axios'
import {auth} from '../store'

class RoomForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      room: '',
      password: '',
      sessionId: '',
      email: '',
      err: '',
      guestLogin: true,
      login: false,
      signup: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    console.log(event.target.value)
    //This is the switch to handle changing which login-component should render.
    switch (event.target.value) {
      case 'login':
        this.setState({guestLogin: false, login: true, signup: false})
        break
      case 'signup':
        this.setState({guestLogin: false, login: false, signup: true})
        break
      default:
        this.setState({guestLogin: true, login: false, signup: false})
        break
    }
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  async handleSubmit(event) {
    event.preventDefault()
    try {
      let response
      if (this.state.login === true) {
        await axios.post('/auth/login', {
          email: this.state.email,
          password: this.state.password
        })
      } else if (this.state.signup === true) {
        await this.props.signedUp(
          this.state.email,
          this.state.password,
          'signup',
          this.state.name
        )
      }
      response = await axios.put('/api/room', {
        roomNum: this.state.room,
        name: this.state.name
      })
      await this.props.setRoom({
        roomNum: this.state.room,
        session: response.data.sessionId,
        token: response.data.token,
        apiKey: response.data.KEY
      })
      this.setState({sessionId: response.data.sessionId})
      console.log('handling stuff', this.state)
      this.props.history.push(`/room/${this.state.room}`)
    } catch (error) {
      console.log(error)
      this.setState({err: 'Invalid Login'})
    }
  }
  render() {
    return (
      <div className="login-component">
        <form onSubmit={this.handleSubmit}>
          {this.state.signup || this.state.guestLogin ? (
            <label>
              Screen Name:
              <input
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </label>
          ) : null}
          {this.state.login || this.state.signup ? (
            <>
              <label>
                Email:
                <input
                  name="email"
                  type="text"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                Password:
                <input
                  name="password"
                  type="text"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </label>
            </>
          ) : null}
          <label>
            Room:
            <input
              name="room"
              type="text"
              value={this.state.room}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="JOIN" />
        </form>
        {!this.state.login ? (
          <button type="button" onClick={this.handleClick} value="login">
            Regulars
          </button>
        ) : null}
        {!this.state.signup ? (
          <button type="button" onClick={this.handleClick} value="signup">
            Sign Up
          </button>
        ) : null}
        {!this.state.guestLogin ? (
          <button type="button" onClick={this.handleClick} value="guest">
            Guest
          </button>
        ) : null}
        {this.state.err ? <div>Invalid Attempt</div> : null}
      </div>
    )
  }
}

const mDTP = dispatch => ({
  setRoom: roomInfo => dispatch(setRoom(roomInfo)),
  signedUp: (email, password, formName, screenName) =>
    dispatch(auth(email, password, formName, screenName))
})

export default connect(null, mDTP)(RoomForm)
