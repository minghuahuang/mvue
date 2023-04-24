// 字符串 \\ 等于 正则 \
const ncname = `[a-zA-Z_][\\-\\.0-9a-zA-Z_]*` // 标签名
const qnameCapture = `((?:${ncname}\\:)?${ncname})` // 命名标签名： <xx:yyy>

const startTagOpen = new RegExp(`^<${qnameCapture}`) // 开始标签开始
const startTagClose = /^\s*(\/?)>/ // 开始标签结束
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`) // 结束标签
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>']+)))?/ // 属性, 匹配 a="1" b='2' c=3 的情况

function createAstElement(tagName, attrs) {
  return {
    tag: tagName,
    type: 1,
    children: [],
    parent: null,
    attrs
  }
}

let root = null
let stack = []

function start(tagName, attributes) {
  let parent = stack[stack.length - 1]
  let element = createAstElement(tagName, attributes)
  
  if(parent) {
    element.parent = parent // 入栈关联父子元素
    parent.children.push(element) 
  } else {
    element.parent = null
  }

  if(!root) {
    root = element
  }

  stack.push(element)
}

function end(tagName) {
  let last = stack.pop()
  if(last.tag !== tagName) {
    throw new Error('Tag error')
  }
}

function chars(text) {
  text = text.replace(/\s/g, '')
  let parent = stack[stack.length - 1]
  if(text) {
    parent.children.push({
      type: 3,
      text,
    })
  }
}

// 解析状态机
export function parseHTML(html) {

  // 删除解析完成的部分
  function advance(length) {
    html = html.substring(length)
  }

  // 解析开始标签
  function parseStartTag() {
    const start = html.match(startTagOpen)
    if(start) {
      const match = {
        tagName: start[1],
        attrs: []
      }
      advance(start[0].length)
      
      let end
      let attr
      // 非标签结束，继续解析属性
      while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        // attr[3] -> a="1",  arr[4] -> b='2', attr[5] -> c=3
        match.attrs.push({ name: attr[1], value: attr[3] ?? attr[4] ?? attr[5] })
        advance(attr[0].length)
      }
      if(end) {
        advance(end[0].length)
      }
      return match
    }
    return null
  }

  // 解析结束标签
  function parseEndTag() {
    const end = html.match(endTag)
    if(end) {
      return { tagName: end[1], input: end[0] }
    }
    return null
  }

  // 循环解析 html，直至解析完成（边解析边删除）
  while(html) {

    let index = html.indexOf('<')

    if(index == 0) {
      const startTagMatch = parseStartTag()
      if(startTagMatch) {
        const { tagName, attrs } = startTagMatch
        start(tagName, attrs)
        continue
      }

      // 边解析边删除，解析完插值后，只剩 </div>，index 再次为 0
      const endTagMatch = parseEndTag()
      if(endTagMatch) {
        const { tagName, input } = endTagMatch
        end(tagName)
        advance(input.length)
        continue
      }
    }

    if(index > 0) {
      let text = html.substring(0, index)
      if(text) {
        chars(text)
        advance(text.length)
      }
    }
  }

  return root
}