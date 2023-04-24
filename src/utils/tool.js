export function type(arg) {
  return Object.prototype.toString.call(arg).slice(8, -1).toLowerCase()
}