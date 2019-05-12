import React, {Component} from 'react'
import {Navbar} from './components'
import Routes from './routes'
import Room from './components/room'
import RoomForm from './components/roomForm'
import {Switch, Route} from 'react-router-dom'
class App extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <div>
        {/* <Navbar /> */}
        {/* <Routes /> */}
        <Switch>
          <Route path="/room" component={Room} />
          <Route path="/" component={RoomForm} />
        </Switch>
      </div>
    )
  }
}

export default App
