import React from 'react'
import Room from './components/Room'
import {Guest, Login, SignUp} from './components/RoomForm'
import {Switch, Route} from 'react-router-dom'
import StartBtn from './components/StartBtn'

const App = () => {
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

export default App
