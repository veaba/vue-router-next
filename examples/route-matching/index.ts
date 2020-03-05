import { createRouter, createHistory, useRoute } from '../../src'
import { createApp, ref } from 'vue'

const router: any = createRouter({
  history: createHistory('/' + __dirname),
  routes: [
    // todo it dont't work
    // { path: '/' },
    // // params are denoted with a colon ":"
    // { path: '/params/:foo/:bar' },
    // // a param can be made optional by adding "?"
    // { path: '/optional-params/:foo?' },
    // // a param can be followed by a regex pattern in parens
    // // this route will only be matched if :id is all numbers
    // { path: '/params-with-regex/:id(\\d+)' },
    // // asterisk can match anything
    // { path: '/asterisk/*' },
    // // make part of the path optional by wrapping with parens and add "?"
    // { path: '/optional-group/(foo/)?bar' },
  ],
})
console.info('==>', '/' + __dirname)
const app = createApp({
  template: `
  <div>
        <h1>Route Matching</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/params/foo/bar">/params/foo/bar</router-link></li>
        <li><router-link to="/optional-params">/optional-params</router-link></li>
        <li><router-link to="/optional-params/foo">/optional-params/foo</router-link></li>
        <li><router-link to="/params-with-regex/123">/params-with-regex/123</router-link></li>
        <li><router-link to="/params-with-regex/abc">/params-with-regex/abc</router-link></li>
        <li><router-link to="/asterisk/foo">/asterisk/foo</router-link></li>
        <li><router-link to="/asterisk/foo/bar">/asterisk/foo/bar</router-link></li>
        <li><router-link to="/optional-group/bar">/optional-group/bar</router-link></li>
        <li><router-link to="/optional-group/foo/bar">/optional-group/foo/bar</router-link></li>
      </ul>
      <p>Route context</p>
      <pre>{{ JSON.stringify(route, null, 2) }}</pre>
    </div>
  `,
  setup() {
    const route: any = useRoute()
    const n = ref(0)
    const navigateAndIncrement = () => {
      // callback don't work
      const increment = () => {
        console.info(111)
        n.value++
      }
      if (route.value.path === '/') {
        router.push('/foo', increment)
      } else {
        router.push('/', increment)
      }
    }

    return {
      n,
      route,
      navigateAndIncrement,
    }
  },
})
app.use(router)
app.mount('#app')

