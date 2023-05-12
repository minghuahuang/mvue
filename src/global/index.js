import { mergeOptions } from '../utils/mergeOptions'

export function initGlobal(MVue) {
  MVue.options = [] // 存放全局配置
  MVue.mixin = function(options) {
    this.options = mergeOptions(this.options, options)
    console.log(this.options)
    // 可以链式调用
    return this 
  }
}