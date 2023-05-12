import Watcher from "../observer/watcher"
import { callHook } from "./callHook"

export function mountComponent(vm, el) {

  callHook(vm, 'beforeMount')

  // 数据更新调用组价更新
  let updateComponent = () => {
    // 调用 render 生成 虚拟dom，并将虚拟 dom 转换 真实 dom
    vm._update(vm._render())
  }
  // updateComponent()
  // 观察者模式，观察属性变化，执行更新操作
  new Watcher(vm, updateComponent, () => {
    console.log('update view')
  }, true) // true 标识 Watcher 为渲染watcher
}

// 更新功能封装为一个 watcher
// 页面渲染前，将当前 watcher 放在 Dep 上
// 页面渲染时，数据属性取值时为属性添加 dep，并为 dep 添加 当前的 watcher，watcher 添加 dep
// 数据属性更新时，触发 dep 中 notify 方法，通知 wather 更新