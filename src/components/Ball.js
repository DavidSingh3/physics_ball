import React, {Component} from 'react'

class Ball extends Component  {

  constructor () {
    super()
    this.state = {
      ball: null
    }
  }

  componentDidMount() {
    this.setState({
      ball: this.refs.ball
    })
  }

  componentWillReceiveProps (nextProps) {
    const ball = this.state.ball
    if(!ball)
      return
    console.log(nextProps)
  }

  render() {
    return <div>
      <svg ref="ball" width="25.000000000000004" height="25.000000000000004" xmlns="http://www.w3.org/2000/svg">
        <title>Layer 1</title>
        <ellipse ry="11.238095" rx="11.238095" id="svg_1" cy="12.5" cx="12.5" strokeWidth="1.5" stroke="#000"
                 fill="#000"/>
      </svg>
    </div>
  }
}

export default Ball