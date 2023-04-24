import { createElement } from "../vdom/index"
import { createTextElement } from "../vdom/index"

export function initRender(MVue) {
  MVue.prototype._c = function(tagName, attrs, ...children) {
    return createElement(this, tagName, attrs, children)
  }
  MVue.prototype._v = function(text) {
    return createTextElement(this, text)
  }
  MVue.prototype._s = function(value) {
    return JSON.stringify(value)
  }
  MVue.prototype._render = function() {
    const { render } = this.$options
    const vnode = render.call(this)
    return vnode
  }
}