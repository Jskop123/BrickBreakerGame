export const game = () => {
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })

  const paddleHeight = 10
  const paddleWidth = 100

  const ballRadius = 10
  let ballSpeedX = 5
  let ballSpeedY = -20

  let paddlePosition = canvas.width / 2 - paddleWidth / 2

  let ballX = canvas.width / 2 
  let ballY = canvas.height - ( paddleHeight + ballRadius )


  let color = 'darkgray' //zmienialny 

  const setStartData = () => {
    ballSpeedX = 2
    ballSpeedY = -10
    paddlePosition = 450
    ballY = canvas.height - ( paddleHeight + ballRadius )
  }

  const createCircle = (centerX, centerY, radius, drawColor) => {
    ctx.fillStyle = drawColor
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI*2, true)
    ctx.fill()
  }

  const createRect = (leftX, topY, width, height, drawColor) => {
    ctx.fillStyle = drawColor
    ctx.fillRect(leftX, topY, width, height)
  }

  const drawBricks = () => {
    for(let i=0; i<5; i++){
      let x = 35+i*200
      createRect(x, 20, 130, 40, 'red') 
    }
  }

  const calculateMousePos = event => {
    const rect = canvas.getBoundingClientRect()
    const root = document.documentElement
    return  event.clientX - rect.left - root.scrollLeft
  }

  const drawEverything = (paddlePosition, ballX, ballY) => {  
    createRect(0, 0, canvas.width, canvas.height, 'black')
    createRect(paddlePosition, canvas.height-paddleHeight, paddleWidth, paddleHeight, 'white')
    createCircle(ballX, ballY, ballRadius, 'red')  
    //drawBricks()
  }

  const findColition = () => {
    if(ballY > 200 && ballY < 240 && ballX > 200 && ballX < 320) {
      color = 'black'
      createRect(200, 200, 120, 40, color)
    }
  }

  const moveBall = () => {
    ballX += ballSpeedX
    ballY += ballSpeedY

    if (ballX > canvas.width - ballRadius ) ballSpeedX = (-1) * ballSpeedX 
    else if(ballX < ballRadius) ballSpeedX = (-1) * ballSpeedX
    
    if(ballY > (canvas.height - (paddleHeight + 2*ballRadius)) && ballX > paddlePosition && ballX < (paddlePosition + paddleWidth)) {      
      ballSpeedY = (-1) * ballSpeedY  
      const ballAngle = ballX - (paddlePosition + paddleWidth / 2)
      ballSpeedX = ballAngle * 0.35
    }
    else if(ballY < 2 * ballRadius){
      ballSpeedY = (-1) * ballSpeedY
    }
  }

  const mouseMoveController = () => {
    const mouseMove = calculateMousePos(event)
    if(mouseMove >= paddleWidth / 2 && mouseMove <= canvas.width - paddleWidth / 2 ) paddlePosition = mouseMove - paddleWidth / 2
  }
 
  let startInterval = null
  const startGame = () => {
    startInterval = setInterval(() => {
      moveBall()
      drawEverything(paddlePosition, ballX, ballY)
      killBall()
    }, 33)
  }

  const killBall = () => {
    if(ballY > canvas.height){
      clearInterval(startInterval)
      ballX = canvas.width / 2 
      ballY = canvas.height - ( paddleHeight + ballRadius )
      paddlePosition = canvas.width / 2 - paddleWidth / 2
      drawEverything(paddlePosition, ballX, ballY)
      ballSpeedY = (-1) * ballSpeedY
    }
  }

  drawEverything(paddlePosition, ballX, ballY)

  window.addEventListener('keydown', startGame)

  window.addEventListener('mousemove', event => mouseMoveController(event))
}


