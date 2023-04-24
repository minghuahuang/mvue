export function mountComponent(vm, el) {
  // 数据更新调用组价更新
  let updateComponent = () => {
    // 调用 render 生成 虚拟dom
    vm._update(vm._render())
    // 虚拟 dom 转换 真实 dom
  }
  updateComponent()
}