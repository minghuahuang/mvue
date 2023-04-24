export function initRender(MVue) {
  MVue.prototype._render = function() {
    console.log('render')
  }
}