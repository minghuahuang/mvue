
let cbs = []
let waiting = false

function flushCallback() {
  cbs.forEach(cb => {
    cb()
  })
  waiting = false
}

// 兼容处理
function timer(flushCallback) {
  let timerFn = () => void 0

  if(Promise) {
    timerFn = () => { Promise.resolve().then(flushCallback) }
  } else if(MutationObserver) {
    let textNode = document.createTextNode(1);
    let observe = new MutationObserver(flushCallback)
    observe.observe(textNode, {
      characterData: true
    })
    timerFn = () => {
      textNode.textContent = 2
    }
  } else if(setImmediate) {
    timerFn = () => {
      setImmediate(flushCallback)
    }
  } else {
    timerFn = () => {
      setTimeout(flushCallback, 0)
    }
  }
  timerFn()
}

export function nextTick(callback) {
  cbs.push(callback)

  if(!waiting) {
    timer(flushCallback)
    waiting = true
  }
}