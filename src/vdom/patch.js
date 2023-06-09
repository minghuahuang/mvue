function createComponent(vnode) {
  let i = vnode.data
  if((i = i.hook) && (i = i.init)) {
    i() // 调用 init 初始化
  }
}

function createElm(vnode) {
  const { vm, tagName, data, key, children, text } = vnode
  if(typeof tagName === 'string') {
    
    if(createComponent(vnode)) {
      // 返回组件真实节点

    }

    // 父节点
    vnode.el = document.createElement(tagName) // vnode.el 即 真实dom
    // 子节点
    children.forEach(child => {
      vnode.el.appendChild(createElm(child))
    });

  } else {
    vnode.el = document.createTextNode(text)
  }
  return vnode.el
}

export function patch(oldVnode, vnode) {
  if(oldVnode.nodeType === 1) {
    // 父节点
    const parenElm = oldVnode.parentNode

    // vnode 创建 真实dom，并挂载
    let elm = createElm(vnode)
    parenElm.insertBefore(elm, oldVnode.nextSibling) // 替换原有位置 dom

    // 删除之前的dom
    parenElm.removeChild(oldVnode)

    // oldVnode 删除需要返回新节点
    return elm
  }
}
