import { arrayMethods } from './array'
import Dep from './dep';

class Observer {
  constructor(data) {
    // 为 array 传递 observeArray 方法，此外所有拦截属性均有 __ob__，可以判断是否拦截过
    // data.__ob__ = this

    // 上述 data 添加 __ob__ 属性，属性值为 this 对象，又会走 defineReactive 方法 导致栈溢出问题
    Object.defineProperty(data, '__ob__', {
      value: this,
      enumerable: false, // 不可枚举
    })

    // 数组 单独处理
    if(Array.isArray(data)) {
      // 重写数组方法，使用 __proto__ 仅修改 data 的数组方法
      data.__proto__ = arrayMethods
      // 数组中元素为对象，继续劫持
      this.observeArray(data);
    } else {
      // 遍历对象，每个属性设置响应式
      this.walk(data);
    }
  }
  walk(data) {
    Object.keys(data).forEach(key => {
      defineReactive(data, key, data[key])
    });
  }
  observeArray(data) {
    data.forEach(item => {
      observe(item)
    })
  }
}

function defineReactive(data, key, value) {
  // 处理 data 属性为对象的情况
  observe(value);
  let dep = new Dep(); // 属性添加一个 dep 属性
  Object.defineProperty(data, key, {
    get() {
      // 取值过程关联 dep 和 watcher
      if(Dep.target) {
        dep.depend()
      }
      return value
    },
    set(val) {
      if(val !== value) {
        // 处理 data 属性赋值为对象的情况
        observe(value);
        value = val
        // 更新视图
        dep.notify() // 通知 dep 中 watcher 更新
      }
    }
  })
}

export function observe(data) {
  // data 不是 object 无法进行数据劫持(object 和 array 可以通过)
  if(!(typeof data === 'object' && data !== null)) {
    return
  }

  // 拦截过的属性不再拦截
  if(data.__ob__) {
    return
  }

  return new Observer(data)
}

// 存在问题：data 的属性对象新增属性，数据不会被劫持。
// 解决办法：
// 1. 属性对象新增属性时，同时和原有属性一起设置成对象进行新增
// 2. 使用 $set()

// 存在问题：data 的属性数组通过索引增加和修改，数据不会被劫持

// push pop shift unshift reverse sort splice 重写，保证监测数组