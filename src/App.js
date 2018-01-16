import React, { Component } from 'react'
import './styles/App.css'
import Ball from './components/Ball.js'

class App extends Component {

  render () {
    return (
      <div className="App">
        <div>
          <Ball ref="ball" />
        </div>
      </div>
    )
  }
}

export default App
