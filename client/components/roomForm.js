import React, {Component} from 'react'
import {setRoom} from '../store/roomReducer'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {auth} from '../store'

class RoomForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      room: '',
      password: '',
      sessionId: '',
      email: '',
      err: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  async handleSubmit(event) {
    event.preventDefault()
    try {
      if (this.state.roomNum === '') {
        throw new Error('No room number provided')
      }
      if (this.props.status === 'login') {
        await axios.post('/auth/login', {
          email: this.state.email,
          password: this.state.password
        })
      } else if (this.props.status === 'signup') {
        let signup = await this.props.signedUp(
          this.state.email,
          this.state.password,
          'signup',
          this.state.name
        )
        console.log(signup)
        if (signup !== undefined) {
          throw new Error('Account already exist')
        }
      }
      let response = await axios.put('/api/room', {
        roomNum: this.state.room,
        name: this.state.name
      })
      await this.props.setRoom({
        name: this.state.name,
        roomNum: this.state.room,
        session: response.data.sessionId,
        token: response.data.token,
        apiKey: response.data.KEY
      })
      this.setState({sessionId: response.data.sessionId})
      console.log('handling stuff', this.state)
      this.props.history.push(`/room/${this.state.room}`)
    } catch (error) {
      this.setState({err: error.message})
    }
  }
  render() {
    return (
      <div className="login-component">
        <form onSubmit={this.handleSubmit}>
          {this.props.status === 'signup' || this.props.status === 'guest' ? (
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
          {this.props.status === 'login' || this.props.status === 'signup' ? (
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
        {this.state.err}
        <div>
          <Link to="/guest">Guest</Link> {'·'}
          <Link to="/login">Login</Link> {'·'}
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    )
  }
}

const mapLogin = () => {
  return {
    status: 'login'
  }
}

const mapSignup = () => {
  return {
    status: 'signup'
  }
}

const mapGuest = () => {
  return {
    status: 'guest'
  }
}

const mDTP = dispatch => ({
  setRoom: roomInfo => dispatch(setRoom(roomInfo)),
  signedUp: (email, password, formName, screenName) =>
    dispatch(auth(email, password, formName, screenName))
})

export const Login = connect(mapLogin, mDTP)(RoomForm)
export const SignUp = connect(mapSignup, mDTP)(RoomForm)
export const Guest = connect(mapGuest, mDTP)(RoomForm)

export default connect(null, mDTP)(RoomForm)
