import { createRect } from './createElements'

const levelNr = level => {
  const path = `../data/levels/0${level}.json`
  return path
}

const createLevels = (bricks, ctx) => (  
  bricks.forEach(brick => createRect(ctx, brick.x, brick.y, brick.w, brick.h, brick.c))
)



export { createLevels, levelNr }

