import { initMixin } from "./init"

function MVue(options) {
  // 初始化
  this._init(options)
}

initMixin(MVue)

export default MVue