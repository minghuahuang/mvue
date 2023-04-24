import { initState } from './state'
import { compileToFunction } from './compiler/index'

export function initMixin(MVue) {
  MVue.prototype._init = function(options) {
    this.$options = options // this -> vm

    // 初始化数据 props, data, watch, computed
    initState(this)

    if(this.$options.el) {
      // 挂载数据
      this.$mount(this.$options.el)
    }
  }
  MVue.prototype.$mount = function(el) {
    let ele = document.querySelector(el)

    // 模板转化为渲染函数 -> 虚拟 dom -> diff 算法更新虚拟 dom -> 更新 dom
    if(!this.$options.render) {
      let template = this.$options.template
      if(!template && el) {
        template = ele.outerHTML;
        let render = compileToFunction(template)
        this.$options.render = render
      }
    }
  }
}

