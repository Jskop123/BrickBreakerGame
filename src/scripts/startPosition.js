class StartPosition {
  constructor(canvasWidth, canvasHeight){
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.paddle = {
      height: 10,
      width: 100,
      position: this.width / 2 - this.width / 2
    }
    this.ball = {
      radius: 10,
      speedX: 5, 
      speedY: -20,
      x: this.canvasWidth / 2,
      y: this.canvasHeight - this.paddle.height - 10
    }
  }  
}

export default StartPosition
