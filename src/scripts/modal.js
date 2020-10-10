const createEl = (element, className, text) => {
  const elmt = document.createElement(element)
  elmt.classList = className
  elmt.innerText = text
  return elmt
}

const createModal = () => {
  const body = document.querySelector('body')
  const modalBg = createEl('div', 'modal-background', null)
  const modalContent = createEl('div', 'modal-content', null)
  const title = createEl('h1', 'modal-title', 'Brick Breaker!!!')
  const subtitle = createEl('h2', 'modal-subtitle', 'Click play to start game...')
  const button = createEl('button', 'modal-button', 'Play')
  
  modalContent.appendChild(title)
  modalContent.appendChild(button)
  modalContent.appendChild(subtitle)
  modalBg.appendChild(modalContent)
  body.appendChild(modalBg)
}

const removeModal = () => document.querySelector('.modal-background').remove()

//export default createModal
export { createModal, removeModal } 