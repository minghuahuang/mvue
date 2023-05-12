const lifeCycleHooks = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforedestroy',
  'destroyed'
]

const strats = {} // 策略

function mergeHook(gValue, uValue) {
  if (uValue) {
    if (gValue) {
      return gValue.concat(uValue)
    } else {
      return [uValue]
    }
  } else {
    return gValue
  } 
}

lifeCycleHooks.forEach(hook => {
  strats[hook] = mergeHook
})

export function mergeOptions(globalOptions, userOptions) {
  const options = {}
  for(let key in globalOptions) {
    mergeField(key)
  }

  for(let key in userOptions) {
    if(globalOptions.hasOwnProperty(key)) {
      continue
    }
    mergeField(key)
  }

  function mergeField(key) {
    let gValue = globalOptions[key]
    let uValue = userOptions[key]

    // 策略模式
    if(strats[key]) {
      options[key] = strats[key](gValue, uValue)
    } else {
      if((typeof gValue === 'object' && gValue !== null) && (typeof uValue === 'object' && uValue !== null)) {
        options[key] = {
          ...gValue,
          ...uValue
        }
      } else {
        options[key] = uValue
      }
    }
  }
  return options
}