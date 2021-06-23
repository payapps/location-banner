import './dropdown.css'
import { createFragmentElements, state, sortObject } from '../../utils'

export const dropDown = ({
  data,
  initialKey = "au",
  getSelected,
  handleSelection,
  getPrevSelected

}) => {
  const optionsSort = sortObject(data);

  const [getOpenState, setOpenState] = state(false);
  const [getOptions, setOptions] = state(optionsSort(initialKey));

  const [
    regionSelector,
    regionSelectorDropdown,
    selectedOption,
    selectedOptionInner,
    dropDown,
    dropDownWrapper
  ] = createFragmentElements(["div", "ul", "li", "div", "ul", "div"]);

  regionSelectorDropdown.classList.add("pa-region-selector-list");
  dropDown.classList.add("pa-region-dropdown");
  selectedOption.classList.add("pa-region-dropdown-selected");
  selectedOptionInner.setAttribute(
    "class",
    "pa-region-dropdown-selected__inner pa-region-option"
  );
  selectedOption.appendChild(selectedOptionInner);
  dropDownWrapper.classList.add("pa-region-dropdown-wrapper");

  const optionsReducer = (optionObj) => (acc, option) => {
    return `${acc}<li class="pa-region-option pa-region-option--${option}" id="${option}">${optionObj[option].value}</li>`;
  };

  const setRegionOptions = (options = data) => {
    const reducer = optionsReducer(options);
    return Object.keys(options).reduce(reducer, "");
  };

  const renderDropDown = (options = data) => {
    const prevSelected = getPrevSelected() || getSelected();
    selectedOptionInner.innerHTML = getOptions()[getSelected()].value;
    selectedOptionInner.classList.remove(`pa-region-option--${prevSelected}`);
    selectedOptionInner.classList.add(`pa-region-option--${getSelected()}`);
    dropDown.innerHTML = setRegionOptions(options);
    dropDownWrapper.appendChild(dropDown);
    selectedOption.appendChild(dropDownWrapper);
  };

  const toggleDropdownVisibility = (bool = getOpenState()) => {
    const dropDownHeight = dropDown.getBoundingClientRect().height;
    const attrStr = `opacity: ${bool ? "1" : "0"}; height: ${
      bool ? dropDownHeight + "px" : "0"
    };`;
    dropDownWrapper.setAttribute("style", attrStr);
  };

  const optionClickHandler = ({ target }) => {
    handleSelection(target.id)
    setOptions(optionsSort(getSelected()));
    renderDropDown(getOptions());
    setOpenState(false);
    toggleDropdownVisibility(getOpenState());
  };

  const openHandler = () => {
    setOpenState(!getOpenState());
    toggleDropdownVisibility();
  };

  selectedOptionInner.addEventListener("click", openHandler);
  dropDown.addEventListener("click", optionClickHandler);
  window.addEventListener("click", ({ target }) => {
    const innerClick = regionSelectorDropdown.contains(target);
    toggleDropdownVisibility(innerClick);
  });

  const initRegionSelector = () => {
    regionSelectorDropdown.appendChild(selectedOption);
    regionSelector.appendChild(regionSelectorDropdown);
    renderDropDown(getOptions());
    return regionSelector;
  };

  return {
    initRegionSelector,
    selected: getSelected
  };
};
