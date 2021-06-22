import { createFragmentElement } from '../../utils'
import './header.css'

export const header = () => {
  const headerElement = createFragmentElement('header')
  const headerElementInner = createFragmentElement('div')
  const headerElementInnerLeft = createFragmentElement('div')
  const headerElementInnerRight = createFragmentElement('div')
  headerElementInnerLeft.classList.add('pa-location-banner__inner__left')
  headerElementInnerRight.classList.add('pa-location-banner__inner__right')
  headerElementInner.appendChild(headerElementInnerLeft)
  headerElementInner.appendChild(headerElementInnerRight)
  headerElement.appendChild(headerElementInner)
  headerElementInner.classList.add('pa-location-banner__inner')
  headerElement.classList.add('pa-location-banner')
  return { headerElement, headerElementInner, headerElementInnerLeft, headerElementInnerRight }
}
