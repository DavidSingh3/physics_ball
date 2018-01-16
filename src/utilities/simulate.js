import CANNON from 'cannon' //lightweight physics engine module
import store from '../redux/store.js'
import {setBallPosition} from '../redux/worldObjects/actions'

const simulate = () => {


// Setup our world
  const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, 0, -9.82) // m/s²
  })

// Create a sphere
  const radius = 1 // m
  const sphereBody = new CANNON.Body({
    mass: 5, // kg
    position: new CANNON.Vec3(0, 0, 10), // m
    shape: new CANNON.Sphere(radius)
  })
  world.addBody(sphereBody)

// Create a plane
  const groundBody = new CANNON.Body({
    mass: 0 // mass == 0 makes the body static
  })
  const groundShape = new CANNON.Plane()
  groundBody.addShape(groundShape)
  world.addBody(groundBody)

  const fixedTimeStep = 1.0 / 60.0 // seconds
  const maxSubSteps = 3

// Start the simulation loop
  let lastTime;
  (function simloop (time) {
    requestAnimationFrame(simloop)
    if (lastTime !== undefined) {
      const dt = (time - lastTime) / 1000
      world.step(fixedTimeStep, dt, maxSubSteps)
    }





    lastTime = time
  })()
}

export default simulate