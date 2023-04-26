import { nextTick } from "../utils/nextTick";
let queue = []
let has = {}
let pending = false

function flushSchedulerQueue() {
  queue.forEach(watcher => {
    watcher.run()
  });
  queue = []
  has = {}
  pending = true
}

export function queueWatcher(watcher) {
  const id = watcher.id
  if(has[id] === undefined) {
    queue.push(watcher)
    has[id] = id // 防止重复

    if(!pending) {
      nextTick(flushSchedulerQueue)
      pending = true
    }
  }
  console.log(queue)
}