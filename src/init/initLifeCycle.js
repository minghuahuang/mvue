import { nextTick } from "../utils/nextTick"
import { patch } from "../vdom/patch"

// 对比更新dom
export function initLifeCycle(MVue) {
  MVue.prototype._update = function(vnode) {
    // 返回新节点再次更新会作为 oldVnode
    this.$el = patch(this.$el, vnode)
  }
  MVue.prototype.$nextTick = nextTick
}