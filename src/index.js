import { initMixin } from "./init/initMixin"
import { initRender } from "./init/initRender"
import { initLifeCycle } from "./init/initLifeCycle"

function MVue(options) {
  // 初始化
  this._init(options)
}

initMixin(MVue)
initRender(MVue)
initLifeCycle(MVue)

export default MVue