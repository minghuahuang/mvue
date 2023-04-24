import { parseHTML } from './parser'
import { generate } from './generator'

// HTML 解析成 脚本 tokens
export function compileToFunction(template) {
  // 生成 AST
  let root = parseHTML(template)
  
  // 生成代码
  let code = generate(root)

  // 生成函数
  let render = new Function(`with(this){ return ${code} }`)

  return render
}