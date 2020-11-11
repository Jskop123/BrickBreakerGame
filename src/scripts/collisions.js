const collisions = (boxes, ctx, radius, x, y) => {
  boxes.forEach((box, index) => {
    if( x > box.x && y > box.y && x < box.x + box.w && y < box.y + box.h ){      
      boxes.splice(index, 1)
      return true
    }
  })
}

export default collisions