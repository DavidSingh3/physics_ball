import React, { Component } from 'react';
import './styles/App.css';
import Maze from './components/Maze.js'
import Ball from './components/Ball.js'
import simulate from './utilities/simulate.js'

class App extends Component {
  componentDidMount() {
    simulate()
  }

  render() {
    return (
      <div className="App">
        <div>
          <Maze />
          <Ball />
        </div>
      </div>
    );
  }
}

export default App;
