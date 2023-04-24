export function initLifeCycle(MVue) {
  MVue.prototype._update = function(vnode) {
    console.log(vnode)
  }
}