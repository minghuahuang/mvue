import { compileToFunction } from '../compiler/index'
import { mountComponent } from '../lifecycle/index'

import { initProps } from '../core/props'
import { initData } from '../core/data'
import { initComputed } from '../core/computed'
import { initWatch } from '../core/watch'

function initState(vm) {
  const opts = vm.$options
  if(opts.props) {
    initProps(vm)
  }
  if(opts.data) {
    initData(vm)
  }
  if(opts.computed) {
    initComputed(opts.computed)
  }
  if(opts.watch) {
    initWatch(opts.watch)
  }
}

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
    this.$el = ele // this -> vm

    // 模板转化为渲染函数 -> 虚拟 dom -> diff 算法更新虚拟 dom -> 更新 dom
    if(!this.$options.render) {
      let template = this.$options.template
      if(!template && ele) {
        template = ele.outerHTML;
        let render = compileToFunction(template)
        this.$options.render = render
      }
    }

    // 挂载
    mountComponent(this, ele)
  }
}

