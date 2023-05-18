export function type(arg) {
  return Object.prototype.toString.call(arg).slice(8, -1).toLowerCase()
}

export function isReservedTag(tag) {
  let str = 'a, div, span, p, img, button, ul, li'
  return str.includes(tag)
}