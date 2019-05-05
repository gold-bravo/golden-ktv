import React, {Component} from 'react'
import {Navbar} from './components'
import Routes from './routes'
import VideoSearchBar from './components/videoSearchBar'
import TokBox from './components/tokbox'
import Room from './components/roomForm'
import {Switch, Route} from 'react-router-dom'
class App extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <div>
        <Navbar />
        <Routes />
        <Switch>
          <Route path="/room" component={VideoSearchBar} />
          <Route path="/" component={Room} />
          {/* <TokBox /> */}
        </Switch>
      </div>
    )
  }
}

export default App
