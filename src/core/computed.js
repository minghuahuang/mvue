import Watcher from "../observer/watcher"
import Dep from "../observer/dep"

let sharedProperty = {}
function defineComputed(vm, key, userDef) {
  if(typeof userDef === 'function') {
    sharedProperty.get = userDef
  } else {
    sharedProperty.get = createComputedGetter(key)
    sharedProperty.set = userDef.set
  }
  Object.defineProperty(vm, key, sharedProperty)
}

function createComputedGetter(key) {
  return function computedGetter() {
    let watcher = this._computedWatchers[key]
    if(watcher.dirty) {
      watcher.evaluate()
    }

    // 如果 Dep.target 有值，继续向上收集
    if(Dep.target) {
      watcher.depend() // watcher 对应多个 dep
    }

    return watcher.value
  }
}

export function initComputed(vm, computed) {
  vm._computedWatchers = {}
  for(let key in computed) {
    const userDef = computed[key]
    let getter = typeof userDef === 'function' ? userDef : userDef.get
    vm._computedWatchers[key] = new Watcher(vm, getter, () => void 0, { lazy: true } ) // 默认不执行

    // key 设置 vm 上
    defineComputed(vm, key, userDef)
  }
}

