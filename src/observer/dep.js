// 利用 Dep 实现属性和 watcher多对多关系
// 每个属性分配一个 dep，dep中存放 watcher，watcher 中存放 dep
let id = 0
class Dep {
  constructor() {
    this.id = id++
    this.subs = [] // 存放 watcher
  }
  depend() {
    // dep 存放 watcher，watcher 存放 dep，多对多关系
    if(Dep.target) {
      Dep.target.addDep(this) // watcher 添加 dep
    }
  }
  addSub(watcher) {
    this.subs.push(watcher)
  }
  notify() {
    this.subs.forEach(watcher => {
      watcher.update()
    })
  }
}

Dep.target = null

let stack = []

export function pushTarget(watcher) {
  Dep.target = watcher
  stack.push(watcher)
}

export function popTarget() {
  stack.pop()
  Dep.target = stack[stack.length - 1]
}

export default Dep