const collisions = (boxes, ctx, radius, x, y) => {
  let collision = false
  boxes.forEach((box, index) => {
    if( x > box.x && y + radius > box.y && x < box.x + box.w && y - radius < box.y + box.h ){      
      boxes.splice(index, 1)
      collision = true
    }
  })
  return collision
}


export default collisions