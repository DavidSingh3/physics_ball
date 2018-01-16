const defaultState = {
  ballPosition: {
    x: 0,
    y: 0
  }
}

export default function worldObjects (state = defaultState, action) {
  const newState = Object.assign({}, state)
  switch (action.type) {
    case 'WORLDOBJECTS_SET_BALL_POSITION':
      newState.ballPosition = action.position
      return newState

    default:
      return state
  }
}