import React from 'react'
import { connect } from 'react-redux'

const Maze = props => {

  return(
    null
  )

}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeCurrentSensor: sensor => {
      dispatch(setCurrentSensor(sensor))
    },
    onSetMapCoords: coords => {
      dispatch(setMapCoords(coords))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoTable)