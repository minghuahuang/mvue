import { initMixin } from "./init/initMixin"
import { initRender } from "./init/initRender"
import { initLifeCycle } from "./init/initLifeCycle"
import { watchMixin } from './init/watchMixin'

function MVue(options) {
  // 初始化
  this._init(options)
}

initMixin(MVue)
initRender(MVue)
initLifeCycle(MVue)
watchMixin(MVue)

export default MVue