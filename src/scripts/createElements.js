const createCircle = (ctx, centerX, centerY, radius, drawColor) => {
  ctx.fillStyle = drawColor
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, Math.PI*2, true)
  ctx.fill()
}

const createRect = (ctx, leftX, topY, width, height, drawColor) => {
  ctx.fillStyle = drawColor
  ctx.fillRect(leftX, topY, width, height)
}


export { createCircle, createRect }
