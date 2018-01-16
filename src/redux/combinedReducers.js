import { combineReducers } from 'redux'
import worldObjects from './worldObjects/reducer.js'

const appReducer = combineReducers({
  worldObjects
})

export default appReducer