import { pushTarget, popTarget } from "./dep"
import { queueWatcher } from "./scheduler"

let id = 0
class Watcher {
  constructor(vm, executor, callback, options) {
    this.vm = vm
    this.executor = executor
    this.callback = callback
    this.options = options
    this.id = id++

    this.deps = [] // 存放 watcher
    this.depsId = new Set();

    // 默认执行
    this.get()
  }
  get() {
    // 关联属性和watcher，属性与watcher之间是多对多的关系
    // 取值之前关联 watcher 和 dep
    pushTarget(this)

    this.executor() // 执行 updateComponent 中 render 会通过 witch+Function 触发劫持数据属性的 get 方法（observer/index）

    popTarget()
  }
  addDep(dep) {
    // 每次取值会为属性添加一个dep，单个属性多次取值，会出现重复
    if(!this.depsId.has(dep.id)) {
      this.depsId.add(dep.id)
      this.deps.push(dep)
      dep.addSub(this) // dep 添加 watcher
    }
  }
  update() {
    queueWatcher(this) // 缓存 watcher，优化多次更新同一watcher
  }
  run() {
    console.log('----')
    this.get()
  }
}

export default Watcher