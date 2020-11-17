import { createRect } from './createElements'

const levelNr = level => {
  const path = `../data/levels/0${level}.json`
  return path
}

const createLevels = (bricks, ctx) => {
  const brickWidth = Math.floor(ctx.canvas.width / 10)
  const brickHeight = Math.floor(ctx.canvas.height / 50)
  return bricks.forEach(brick => createRect(ctx, brick.x, brick.y, brickWidth, brickHeight, brick.c))
}

export { createLevels, levelNr }

