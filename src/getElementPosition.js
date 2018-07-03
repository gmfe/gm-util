export default function getElementPosition (element) {
  var top = element.offsetTop
  var left = element.offsetLeft
  var current = element.offsetParent
  while (current !== null) {
    top += current.offsetTop
    left += current.offsetLeft
    current = current.offsetParent
  }
  return {
    top,
    left
  }
}
