import { createRect } from './createElements'
import collisions from './collisions'
const json = require('../01.json')

const createLevels = (ctx, radius, x, y) => {  
  const bricks = json.brick_positions
  bricks.forEach(brick => {
    createRect(ctx, brick.x, brick.y, brick.w, brick.h, brick.c)
  })
  collisions(bricks, ctx, radius, x, y)
}

export default createLevels


//ctx, leftX, topY, width, height, drawColor