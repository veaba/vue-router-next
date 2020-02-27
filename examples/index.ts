import {createApp} from 'vue'

///<reference path="../src/global.d.ts"/>
const context = require.context('.', true, /^.{2,}\/index\.ts$/)
const DIR_RE = /^\.\/([^/]+)\//

let examples: string[] = []
context.keys().forEach(path => {
  const match = DIR_RE.exec(path)
  if (match) examples.push(match[1])
  return name
})

examples.sort()

examples = Array.from(new Set(examples))


console.log('examples==>', examples)
const template={
  data:{examples}
}
createApp(template).mount('#app')
