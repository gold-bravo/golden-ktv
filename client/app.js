import React, {Component} from 'react'
import {Navbar} from './components'
import Routes from './routes'
import Room from './components/room'
import RoomForm from './components/roomForm'
import {Switch, Route} from 'react-router-dom'
import StartBtn from './components/StartBtn'

class App extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <div className="body">
        <Switch>
          <Route path="/room" component={Room} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/guest" component={Guest} />
          <Route path="/" component={StartBtn} />
        </Switch>
      </div>
    )
  }
}

export default App
