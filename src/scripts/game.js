import StartPosition from './startPosition'
import { createCircle, createRect } from './createElements'
import { createModal, removeModal } from './modal'
import isMobile from './isMobile'
import { createLevels, levelNr } from './createLevels'
import collisions from './collisions'
import winLevel from './winLevel'

const game = () => {

  let level = 1
  let json = require('../data/levels/01.json')
  const bricks = json.brick_positions
  createModal()
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')

  const setResponsiveCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  setResponsiveCanvas()
  window.addEventListener('resize', setResponsiveCanvas)
  
  const drawEverything = (paddlePosition, x, y) => {  
    createRect(ctx, 0, 0, canvas.width, canvas.height, 'black')
    createRect(ctx, paddlePosition, canvas.height-height, width, height, 'white')
    createCircle(ctx, x, y, radius, 'red') 
    createLevels(bricks, ctx)
  }

  const start = new StartPosition(canvas.width, canvas.height)
  const { height, width } = start.paddle
  let paddlePosition = canvas.width / 2 - width / 2    
  let { radius, speedX, speedY, x, y } = start.ball
  
  
  const calculateMousePos = event => {
    const rect = canvas.getBoundingClientRect()
    const root = document.documentElement
    return  event.clientX - rect.left - root.scrollLeft
  }

  const mouseMoveController = event => {
    const mouseMove = calculateMousePos(event)
    if(mouseMove >= width / 2 && mouseMove <= canvas.width - width / 2 ) paddlePosition = mouseMove - width / 2
  }

  const moveBall = () => {
    x += speedX
    y += speedY

    if (x > canvas.width - radius ) speedX = (-1) * speedX 
    else if(x < radius) speedX = (-1) * speedX
    
    if(y > (canvas.height - (height + 2*radius)) && x > paddlePosition && x < (paddlePosition + width)) {      
      speedY = (-1) * speedY  
      const ballAngle = x - (paddlePosition + width / 2)
      speedX = ballAngle * 0.35
    }
    else if(y < 2 * radius){
      speedY = (-1) * speedY
    }
    let collision = collisions(bricks, ctx, radius, x, y)
    if(collision){
      speedY = (-1) * speedY
      winLevel(bricks, level)  
    }
  }
 
  let startInterval = null
  const startGame = () => { 
    startInterval = setInterval(() => {
      moveBall()
      drawEverything(paddlePosition, x, y)
      killBall()
    }, 33)
  }

  const killBall = () => {
    if(y > canvas.height){
      clearInterval(startInterval)
      x = canvas.width / 2 
      y = canvas.height - ( height + radius )
      paddlePosition = canvas.width / 2 - width / 2
      speedY = (-1) * speedY
      drawEverything(paddlePosition, x, y)
      createModal()
    }
  }

  const controlPaddle = event => {
    isMobile() ? (
      window.addEventListener('touchmove', event => mouseMoveController(event.targetTouches[0]))
    ) : (
      window.addEventListener('mousemove', event => mouseMoveController(event))
    )
  }
  controlPaddle()
  
  window.addEventListener('click', event => {
    if(event.target.className === 'modal-button'){
      removeModal()
      startGame()
    }
  })
}

export default game


