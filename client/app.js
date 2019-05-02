import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import VideoSearchBar from './components/videoSearchBar'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <VideoSearchBar />
    </div>
  )
}

export default App
