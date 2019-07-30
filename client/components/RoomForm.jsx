import React, {Component} from 'react'
import {setRoom} from '../store/roomReducer'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {auth} from '../store'
import ReactDOM from 'react-dom'

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
  componentDidMount() {
    setTimeout(() => {
      this.div.style.opacity = 1
    }, 100)
  }

  onClick = () => {
    const body = ReactDOM.findDOMNode(app)
    body.parentNode.style.backgroundColor = ''
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
      this.props.history.push(`/room/${this.state.room}`)
    } catch (error) {
      this.setState({err: error.message})
    }
  }

  render() {
    return (
      <div
        className="center-form"
        ref={e => (this.div = e)}
        style={{marginLeft: '20px'}}
      >
        <div className="login-component">
          <form onSubmit={this.handleSubmit}>
            {this.props.status === 'signup' || this.props.status === 'guest' ? (
              <label>
                <input
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.handleChange}
                  placeholder="screenname"
                />
              </label>
            ) : null}
            {this.props.status === 'login' || this.props.status === 'signup' ? (
              <>
                <label>
                  <input
                    name="email"
                    type="text"
                    value={this.state.email}
                    onChange={this.handleChange}
                    placeholder="email"
                  />
                </label>
                <label>
                  <input
                    name="password"
                    type="text"
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder="password"
                  />
                </label>
              </>
            ) : null}
            <label>
              <input
                name="room"
                type="text"
                value={this.state.room}
                onChange={this.handleChange}
                placeholder="room"
              />
            </label>
            <input
              onClick={this.onClick}
              style={{
                marginTop: '15px',
                marginBottom: '15px'
              }}
              type="submit"
              value="JOIN"
              className="button is-primary is-warning is-large"
            />
          </form>
          <div className="link-pile">
            <div>
              <img src="../favicon.ico" />
              <Link to="/guest">Guest</Link>
              <img src="../favicon.ico" />
            </div>
            <div>
              <img src="../favicon.ico" />
              <Link to="/login">Login</Link>
              <img src="../favicon.ico" />
            </div>
            <div>
              <img src="../favicon.ico" />
              <Link to="/signup">Sign Up</Link>
              <img src="../favicon.ico" />
            </div>
          </div>
          <div className="wrap">{this.state.err}</div>
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
