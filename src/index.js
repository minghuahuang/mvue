import { initMixin } from "./init/initMixin"
import { initRender } from "./init/initRender"
import { initLifeCycle } from "./init/initLifeCycle"
import { watchMixin } from './init/watchMixin'
import { initGlobal } from "./global/index"

function MVue(options) {
  // 初始化
  this._init(options)
}

// 原型扩展
initMixin(MVue)
initRender(MVue)
initLifeCycle(MVue)
watchMixin(MVue)

// 类扩展
initGlobal(MVue)

export default MVue