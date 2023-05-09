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

    this.user = !!options.user // 标识是否为用户wather
    this.lazy = !!options.lazy // 判断是否立即执行computed
    this.dirty = !!options.lazy

    if(typeof executor === 'string') {
      this.getter = function() {
        let path = executor.split('.')
        let obj = vm
        for(let i = 0; i < path.length; i++) {
          obj = obj[path[i]]
        }
        return obj // 取值时进行依赖收集
      }
    } else {
      this.getter = executor
    }

    this.deps = [] // 存放 watcher
    this.depsId = new Set();

    // 默认执行
    this.value = this.lazy ? undefined : this.get() // watch 中的 旧值
  }
  get() {
    // 关联属性和watcher，属性与watcher之间是多对多的关系
    // 取值之前关联 watcher 和 dep
    pushTarget(this)

    const value = this.getter.call(this.vm) // 执行 updateComponent 中 render 会通过 witch+Function 触发劫持数据属性的 get 方法（observer/index）

    popTarget()

    return value
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
    // 更新之后，更新 dirty 继续重新取值
    if(this.lazy) {
      this.dirty = true
    } else {
      queueWatcher(this) // 缓存 watcher，优化多次更新同一watcher
    }
  }
  run() {
    let newValue = this.get()
    let oldValue = this.value

    this.value = newValue // 更新：新值会成为下一次的旧值

    if(this.user) {
      this.callback.call(this.vm, newValue, oldValue)
    }
  }
  evaluate() {
    this.dirty = false // 取过值了，设置为false
    this.value = this.get()
  }
  depend() {
    let i = this.deps.length
    while(i--) {
      this.deps[i].depend(); // 收集渲染watcher
    }
  }
}

export default Watcher