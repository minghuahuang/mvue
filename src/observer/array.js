export let arrayMethods = Object.create(Array.prototype)

let methods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'reverse',
  'sort',
  'splice'
]

methods.forEach(method => {
  arrayMethods[method] = function (...args) {
    Array.prototype[method].apply(this, args)
    let insert
    // 通过 this 获取 observeArray 方法
    let ob = this.__ob__
    // 新增数组元素为 对象时，需要劫持
    switch (method) {
      case 'push':
      case 'unshift':
        insert = args
        break;
      case 'splice':
        insert = args.slice(2)
        break;
      default:
        break;
    }
    // 存在新增元素
    // 更新操作
    if(insert) {
      ob.observeArray(insert)
    }
  }
})