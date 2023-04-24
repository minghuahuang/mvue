function vnode(vm, tagName, attrs, key, children, text) {
  return {
    vm, tagName, attrs, key, children, text
  }
}

export function createElement(vm, tagName, attrs = {}, children) {
  return vnode(vm, tagName, attrs, undefined, children, undefined)
}

export function createTextElement(vm, text) {
  return vnode(vm, undefined, undefined, undefined, undefined, text)
}