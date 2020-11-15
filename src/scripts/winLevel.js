import { createModal } from "./modal"

const winLevel = (array, level) => {
  console.log('win')
  if(array.length == 0){
    window.setTimeout(() => {
      alert('win')
      createModal()
    }, 100)
    level++
    console.log(level)
    return level
  }
}

export default winLevel

/*
{
      "x": 110,
      "y": 30,
      "w": 100,
      "h": 20,
      "c": "red"
    },
    {
      "x": 310,
      "y": 100,
      "w": 100,
      "h": 20,
      "c": "red"
    },
    {
      "x": 410,
      "y": 300,
      "w": 100,
      "h": 20,
      "c": "red"
    },
    {
      "x": 810,
      "y": 500,
      "w": 100,
      "h": 20,
      "c": "red"
    },
    {
      "x": 510,
      "y": 400,
      "w": 100,
      "h": 20,
      "c": "red"
    }
*/