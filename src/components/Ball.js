import React, { Component } from 'react'
import Matter from 'matter-js'

const Engine = Matter.Engine
const Render = Matter.Render
const World = Matter.World
const Bodies = Matter.Bodies
const Mouse = Matter.Mouse
const MouseConstraint = Matter.MouseConstraint
const Runner = Matter.Runner

class Ball extends Component {

  constructor () {
    super()

    this.state = {
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
    const offsetLR = 1.5
    const offsetFB = 21
    const tiltLR = e.gamma - offsetLR // left-right
    const tiltFB = e.beta - offsetFB // up-down

    this.setState({
      tiltLR,
      tiltFB
    })
  }

  componentDidMount () {
    window.addEventListener('deviceorientation', this.deviceOrientationHandler, true)

    const engine = Engine.create()
    engine.world.gravity.y = 0

    // Matter.World.create({
    //   bounds: {
    //     min: {x: 100, y: 100},
    //     max: {x: this.viewport().width, y: this.viewport().height}
    //   }
    // })

    const render = Render.create({
      element: document.body,
      engine: engine,
      options: {
        width: this.viewport().width,
        height: this.viewport().height,
        wireframes: false
      }
    })

    // // add mouse control
    // const mouse = Mouse.create(render.canvas)
    // const mouseConstraint = MouseConstraint.create(engine, {
    //   mouse: mouse,
    //   constraint: {
    //     stiffness: 0.2,
    //     render: {
    //       visible: false
    //     }
    //   }
    // })

    // walls
    const wallWidth = 10
    const wallN = Bodies.rectangle(this.viewport().width / 2, 0, this.viewport().width, wallWidth, {isStatic: true})
    const wallS = Bodies.rectangle(this.viewport().width / 2, this.viewport().height, this.viewport().width, wallWidth, {isStatic: true})
    const wallW = Bodies.rectangle(0, this.viewport().height / 2, wallWidth, this.viewport().height, {isStatic: true})
    const wallE = Bodies.rectangle(this.viewport().width, this.viewport().height / 2, wallWidth, this.viewport().height, {isStatic: true})
    World.add(engine.world, [wallN, wallS, wallW, wallE])

    // objects
    const ramp = Bodies.rectangle(this.viewport().width / 2, this.viewport().height / 2 + 230, 810, 90, {
      isStatic: true,
      angle: -(Math.PI / 4) /*45 degrees in radians in terms of PI*/
    })
    const ball = Bodies.circle(this.viewport().width / 2, this.viewport().height / 2, 20, 10)

    World.add(engine.world, [ball, ramp, wallN, wallS, wallW, wallE])

    // Engine.run(engine)

    const run = () => {
      window.requestAnimationFrame(run)
      const LR = this.state.tiltLR / 10
      const FB = this.state.tiltFB / 10
      console.log(LR, FB)
      Matter.Body.setVelocity(ball, {x: LR, y: FB})
      Engine.update(engine, 1000 / 60)
    }

    run()

    Render.run(render)

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