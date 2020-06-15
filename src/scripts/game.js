export const game = () => {
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')

  let ballX = canvas.width / 2
  let ballY = canvas.height - 30

  let ballSpeedX = 4
  let ballSpeedY = -20

  let paddleX = 450
  let paddleWidth = 100

  let color = 'darkgray' //zmienialny 

  const framesPerSecond = 30

  const colorCircle = (centerX, centerY, radius, drawColor) => {
    ctx.fillStyle = drawColor
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI*2, true)
    ctx.fill()
  }

  const colorRect = (leftX, topY, width, height, drawColor) => {
    ctx.fillStyle = drawColor
    ctx.fillRect(leftX, topY, width, height)
  }

  const calculateMousePos = event => {
    const rect = canvas.getBoundingClientRect()
    const root = document.documentElement
    const mouseX = event.clientX - rect.left - root.scrollLeft
    const mouseY = event.clientY - rect.top - root.scrollTop
    return {
      x: mouseX,
      y: mouseY
    }
  }

  const drawEverything = () => {  
    colorRect(0, 0, canvas.width, canvas.height, 'black')
    colorRect(paddleX, canvas.height-20, 100, 20, 'white')
    colorCircle(ballX, ballY, 10, 'red')  
    drawBoxes()
  }

  const drawBoxes = () => {
    colorRect(200, 200, 120, 40, color)
  }

  const findColition = () => {
    if(ballY > 200 && ballY < 240 && ballX > 200 && ballX < 320) {
      color = 'black'
      colorRect(200, 200, 120, 40, color)
    }
  }

  const moveEverything = () => {

    ballX = ballX + ballSpeedX
    ballY = ballY + ballSpeedY

    if (ballX > canvas.width ) {
      ballSpeedX = (-1) * ballSpeedX
    }
    else if(ballX < 0) {
      ballSpeedX = (-1) * ballSpeedX
    }

    if(ballY > canvas.height) {
      if(ballX > paddleX && ballX < paddleX + paddleWidth){
        ballSpeedY = (-1) * ballSpeedY  

        const deltaY = ballX - (paddleX + paddleWidth / 2)
        ballSpeedX = deltaY * 0.35
      }
      else {
        ballX =  500
        ballY = 800
      }
    }
    else if(ballY < 0) ballSpeedY = (-1) * ballSpeedY
  }

  drawEverything()

  canvas.addEventListener('click', () => {
    window.setInterval(() => {
      moveEverything()
      drawEverything()
      findColition()
    }, 1000/framesPerSecond)
  })

  canvas.addEventListener('mousemove', event => {
    const mouseMove = calculateMousePos(event)
    paddleX = mouseMove.x - paddleWidth / 2
  })
}


