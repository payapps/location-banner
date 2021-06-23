import { createFragmentElement } from '../../utils'
import './button.css'

export const button = href => {
  const buttonElement = createFragmentElement('a') 
  buttonElement.setAttribute('href', href)
  buttonElement.classList.add('pa-location-banner__cont__btn')
  buttonElement.textContent = 'Continue'
  return buttonElement
}
