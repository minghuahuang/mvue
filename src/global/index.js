import { mergeOptions } from '../utils/mergeOptions'

export function initGlobal(MVue) {
  MVue.options = [] // 存放全局配置
  MVue.mixin = function(options) {
    this.options = mergeOptions(this.options, options)
    // 可以链式调用
    return this 
  }

  MVue.options._base = MVue // 共享 Mvue
  MVue.options.components = {}
  MVue.component = function(id, definition) {
    // 隔离组件，每个组件都需要使用新类继承父类
    definition = MVue.options._base.extend(definition)
    this.options.components[id] = definition
  }

  // 继承类
  MVue.extend = function(opts) {
    const Sub = function MVueComponent(options) {
      this._init(options)
    }
    Sub.prototype = Object.create(this.prototype)
    Sub.prototype.constructor = Sub
    Sub.options = mergeOptions(this.options, opts)
    return Sub
  }
}