import { initProps } from './core/props'
import { initData } from './core/data'
import { initComputed } from './core/computed'
import { initWatch } from './core/watch'

export function initState(vm) {
  const opts = vm.$options
  if(opts.props) {
    initProps(vm)
  }
  if(opts.data) {
    initData(vm)
  }
  if(opts.computed) {
    initComputed(opts.computed)
  }
  if(opts.watch) {
    initWatch(opts.watch)
  }
}