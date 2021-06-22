export const createFragmentElement = elementType => {
  return document.createDocumentFragment().appendChild(document.createElement(elementType))
}

export const createFragmentElements = (elementArr) => elementArr.map((elm) => createFragmentElement(elm))

