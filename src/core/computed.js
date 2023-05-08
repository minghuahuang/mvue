import Watcher from "../observer/watcher"

let sharedProperty = {}
function defineComputed(vm, key, userDef) {
  if(typeof userDef === 'function') {
    sharedProperty.get = userDef
  } else {
    sharedProperty.get = userDef.get
    sharedProperty.set = userDef.set
  }
  Object.defineProperty(vm, key, sharedProperty)
}

export function initComputed(vm, computed) {
  for(let key in computed) {
    const userDef = computed[key]
    let getter = typeof userDef === 'function' ? userDef : userDef.get
    new Watcher(vm, getter, () => void 0, { lazy: true } ) // 默认不执行

    // key 设置 vm 上
    defineComputed(vm, key, userDef)
  }
}

