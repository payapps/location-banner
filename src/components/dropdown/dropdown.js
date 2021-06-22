import './dropdown.css'

export const dropDown = ({ data, initialKey = "au" }) => {
  const state = (initial) => {
    const s = {
      prev: null,
      next: initial
    };
    const setState = (args) => {
      s.prev = s.next;
      s.next = args;
    };
    const getPrevState = () => s.prev;
    const getState = () => s.next;
    return [getState, setState, getPrevState];
  };

  const objectSorter = (obj) => {
    return (selected) => {
      const { [selected]: _, ...rest } = obj;
      return { [selected]: { ...obj[selected] }, ...rest };
    };
  };

  const optionsSort = objectSorter(data);

  const [getOpenState, setOpenState] = state(false);
  const [getOptions, setOptions] = state(optionsSort(initialKey));
  const [getSelected, setSelected, getPrevSelected] = state(initialKey);

  const createFragmentElement = (elementType) =>
    document
      .createDocumentFragment()
      .appendChild(document.createElement(elementType));

  const createFragmentElements = (elementArr) =>
    elementArr.map((elm) => createFragmentElement(elm));
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
    setSelected(target.id);
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
