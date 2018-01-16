import React, { Component } from 'react';
import './styles/App.css';
import Maze from './components/Maze.js'
import simulate from './utilities/simulate.js'

class App extends Component {
  componentDidMount() {
    simulate()
  }

  render() {
    return (
      <div className="App">
        <canvas id="viewport" />
        <Maze />
      </div>
    );
  }
}

export default App;
