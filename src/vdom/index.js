import { isReservedTag } from "../utils/tool"

function vnode(vm, tagName, data, key, children, text, componentOptions) {
  return {
    vm, tagName, data, key, children, text, componentOptions
  }
}

function createComponent(vm, tagName, data, key, children, Ctor) {
  if(typeof Ctor === 'object' && Ctor !== null) {
    Ctor = vm.$options._base.extend(Ctor)
  }
  // 渲染组件调用初始化方法
  data.hook = { init() {
    new Ctor({ _isComponent: true }) // new Sub()
  } }
  console.log(vnode(vm, `mvue-component-${tagName}`, data, key, undefined, undefined, { Ctor, children }))
  return vnode(vm, `mvue-component-${tagName}`, data, key, undefined, undefined, { Ctor, children })
}

export function createElement(vm, tagName, data = {}, ...children) {

  if(isReservedTag(tagName)) {
    return vnode(vm, tagName, data, data.key, children, undefined)
  } else {
    const Ctor = vm.$options.components[tagName]
    return createComponent(vm, tagName, data, data.key, children, Ctor)
  }
}

export function createTextElement(vm, text) {
  return vnode(vm, undefined, undefined, undefined, undefined, text)
}