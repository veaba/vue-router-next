import { createApp } from 'vue'

///<reference path="../src/global.d.ts"/>
const context = require.context('.', true, /^.{2,}\/index\.ts$/)
const DIR_RE = /^\.\/([^/]+)\//

let examples: string[] = []
context.keys().forEach(path => {
  const match = DIR_RE.exec(path)
  if (match) examples.push(match[1])
  return name
})

// is supported
const doneArray = [
  'basic',
  'encoding',
  'named-views',
  'route-alias',
  'data-fetching'
]
// not supported yet
const noYetArray = [
  'hash-mode',
  'nested-routes',
  'named-routes',
  'route-matching',
  'active-links',
  'redirect',// has error,like will get /redirect/foo,but get  /redirectfoo
  'route-props',//type not supported props attrs yet
  'route-params',// source code throw error Error: Missing required param "id"
  'transitions',// not supported yet
]
examples.sort()

examples = Array.from(new Set(examples))

examples = examples.map(item => {
  return doneArray.includes(item) ? ('√ ' + item) : (noYetArray.includes(item) ? ('x ' + item) : item)
})
const template = {
  data: { examples },
}
createApp(template).mount('#app')
