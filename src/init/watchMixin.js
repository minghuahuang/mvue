import Watcher from "../observer/watcher"

export function watchMixin(MVue) {
  MVue.prototype.$watch = function(key, handler, options = {}) {
    options.user = true
    new Watcher(this, key, handler, options)
  }
}