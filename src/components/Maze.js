import React, { Component } from 'react'
import { connect } from 'react-redux'

class Maze extends Component {

  render () {
    return (
      <canvas id="viewport" ref="viewport" />
    )
  }

}

const mapStateToProps = state => {
  return {
    ballPosition: state.worldObjects.ballPosition
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Maze)