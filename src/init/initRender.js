import { createElement } from "../vdom/index"
import { createTextElement } from "../vdom/index"

export function initRender(MVue) {
  // 处理标签及属性
  MVue.prototype._c = function(tagName, attrs, ...children) {
    return createElement(this, tagName, attrs, children)
  }
  // 处理文本内容
  MVue.prototype._v = function(text) {
    return createTextElement(this, text)
  }
  // 处理数据为对象的情况
  MVue.prototype._s = function(value) {
    return typeof value === 'object' ? JSON.stringify(value) : value
  }

  MVue.prototype._render = function() {
    const { render } = this.$options
    const vnode = render.call(this)
    return vnode
  }
}