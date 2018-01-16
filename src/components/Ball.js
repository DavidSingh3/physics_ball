import React, { Component } from 'react'
import Matter from 'matter-js'

const Engine = Matter.Engine
const Render = Matter.Render
const World = Matter.World
const Bodies = Matter.Bodies

class Ball extends Component {



  engine = Engine.create()
  render = Render.create({
    element: document.body,
    engine: this.engine,
    options: {
      width: 500, //this.viewport().width,
      height: 2000, //this.viewport().height,
      wireframes: false
    }
  })


  constructor () {
    super()

    const ball = Bodies.circle(30, 30, 20, 10)
    const ground = Bodies.rectangle(400, 380, 810, 60, {isStatic: true})

    World.add(this.engine.world, [ball])

    Engine.run(this.engine)
    Render.run(this.render)

    this.state = {
      left: 0,
      top: 0,
      tiltLR: 0,
      tiltFB: 0
    }
    // this.deviceOrientationHandler = this.deviceOrientationHandler.bind(this)
  }

  viewport = () => {
    let e = window
    let a = 'inner'
    if (!('innerWidth' in window)) {
      a = 'client'
      e = document.documentElement || document.body
    }
    return {width: e[a + 'Width'], height: e[a + 'Height']}
  }

  deviceOrientationHandler = (e) => {
    const tiltLR = e.gamma - 1.5 // left-right
    const tiltFB = e.beta - 21 // up-down

    const viewport = this.viewport()

    let left = this.state.left + tiltLR
    left = Math.max(left, 0)
    left = Math.min(left, viewport.width - 25)

    let top = this.state.top + tiltFB
    top = Math.max(top, 0)
    top = Math.min(top, viewport.height - 25)

    this.setState({
      left,
      top,
      tiltLR,
      tiltFB
    })
  }

  componentDidMount () {
    window.addEventListener('deviceorientation', this.deviceOrientationHandler, true)
  }

  render () {
    return null
    // return <div>
    //   left-right tilt: <span>{this.state.tiltLR}</span> <br/>
    //   front-back tilt: <span>{this.state.tiltFB}</span>
    //   <svg style={{
    //     display: 'none',
    //     left: this.state.left,
    //     top: this.state.top
    //   }} ref="ball" width="25.000000000000004" height="25.000000000000004" xmlns="http://www.w3.org/2000/svg">
    //     <title>Layer 1</title>
    //     <ellipse ry="11.238095" rx="11.238095" id="svg_1" cy="12.5" cx="12.5" strokeWidth="1.5" stroke="#000"
    //              fill="#000"/>
    //   </svg>
    // </div>
  }
}

export default Ball