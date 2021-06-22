import {dropDown } from './components/dropdown'

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

document.body.appendChild(initRegionSelector());

