import { type } from '../utils/tool'
import { observe } from '../observer/index'

function proxy(vm, source, key) {
  Object.defineProperty(vm, key,{
    get() {
      return vm[source][key]
    },
    set(val) {
      vm[source][key] = val
    }
  })
}

export function initData(vm) {
  let { data } = vm.$options

  // 判断 data 类型（object，function），并关联vm
  data = vm._data = type(data) === 'function' ? data.call(vm) : data

  // 代理 vm.name = vm._data.name
  for(let key in data) {
    proxy(vm, '_data', key)
  }

  // 响应式数据处理
  observe(data)
}