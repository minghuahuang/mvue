const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g // 插值 {{  }}

function gen(child) {
  if(child.type === 1) {
    return generate(child)
  } else {
    if(!defaultTagRE.test(child.text)) {
      return `_v(${JSON.stringify(child.text)})`
    } else {
      // 处理 <div>hello {{ name }} world</div> 嵌套插值的情况
      let tokens = []
      let match
      let index = 0
      // 针对 exec 状态机问题
      defaultTagRE.lastIndex = 0
      while(match = defaultTagRE.exec(child.text)) {
        // 插值嵌套文本中间情形
        if(match.index > index) {
          // 捕获插值前文本内容
          tokens.push(JSON.stringify(child.text.slice(index, match.index)))
        }
        // 捕获插值内容, 插值内容可能为对象，需要使用 _s 继续处理
        tokens.push(`_s(${match[1].trim()})`)
        index = match.index + match[0].length
      }
      if(index < child.text.length) {
        tokens.push(JSON.stringify(child.text.slice(index)))
      }
      return `_v(${tokens.join('+')})`
    }
  }
}

function genProps(attrs) {
  let str = ''
  attrs.forEach(attr => {
    if(attr.name === 'style') {
      let styleObj = {}
      attr.value.replace(/([^;:]+)\:([^;:]+)/g, function(_,name,value) {
       styleObj[name] = value
      })
      attr.value = styleObj
    }
    str += `${attr.name}:${JSON.stringify(attr.value)},`
  })
  return `{${str.slice(0, -1)}}` // 去掉最后一项逗号
}

function genChildren(children) {
  return `,${children.map(child => gen(child)).join(',')}`
}

export function generate(root) {
  // 遍历 root 拼接 字符串 _c('div', { id: 'app', a: 1 }, _v('hello')) 返回
  let code = `_c(${JSON.stringify(root.tag)}, ${root.attrs.length ? genProps(root.attrs) : 'undefined'}${root.children.length ? genChildren(root.children) : ''})`
  return code
}