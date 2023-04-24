export function initLifeCycle(MVue) {
  MVue.prototype._update = function() {
    console.log('lifeCycle')
  }
}