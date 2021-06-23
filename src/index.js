import {dropDown } from './components/dropdown'
import { header } from './components/header'
import { button } from './components/button'
import { state } from './utils'

const UK = 'uk'
const AU = 'au'

const dropDownOptions = {
  uk: { value: "United Kingdom" },
  au: { value: "Australia" }
};


const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
const initialKey = timezone.toLowerCase().includes('europe') ? UK : AU
const getRegionURL = (selected = initialKey) => `https://${selected}.payapps.com/`

const [getHREF, setHREF] = state(getRegionURL())
const [getSelected, setSelected, getPrevSelected] = state(initialKey);

const buttonElement = button(getHREF())
const { headerElement, headerElementInnerLeft, headerElementInnerRight } = header()

const handleSelection = selected => {
  setSelected(selected)
  setHREF(getRegionURL(getSelected()))
  buttonElement.setAttribute('href', getHREF())
}

const { initRegionSelector } = dropDown({
  data: dropDownOptions,
  initialKey,
  getSelected,
  handleSelection,
  setSelected,
  getPrevSelected
});

headerElementInnerLeft.innerHTML = '<p class="pa-location-banner__message">Choose another country or region to see pricing and content specific to your location.</p>'

headerElementInnerRight.appendChild(initRegionSelector())
headerElementInnerRight.appendChild(buttonElement)

document.body.prepend(headerElement);

