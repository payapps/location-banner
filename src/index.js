import {dropDown } from './components/dropdown'
import { header } from './components/header'

const dropDownOptions = {
  uk: {
    value: "United Kingdom",
    icon: "uk"
  },
  au: {
    value: "Australia",
    icon: "au"
  }
};

const { initRegionSelector } = dropDown({
  data: dropDownOptions,
  initialKey: "au"
});

const { headerElement, headerElementInner, headerElementInnerLeft, headerElementInnerRight } = header()
headerElementInnerRight.appendChild(initRegionSelector())

document.body.prepend(headerElement);

