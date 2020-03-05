import { createRouter, createHistory, useRoute } from '../../src'
import { RouteComponent } from '../../src/types'
import { createApp, ref } from 'vue'

const Home: RouteComponent = { template: '<div>home</div>' }
const Foo: RouteComponent = { template: '<div>foo</div>' }
const Bar: RouteComponent = { template: '<div>bar</div>' }
const Unicode: RouteComponent = { template: '<div>unicode</div>' }


const router: any = createRouter({
  history: createHistory(''),
  // history: createHistory('/' + __dirname),
  routes: [
    { path: '/', component: Home, name: 'home' },
    { path: '/foo', component: Foo, name: 'foo' },
    { path: '/bar', component: Bar, name: 'bar' },
    { path: '/é', component: Unicode, name: 'euro' },
  ],
})
console.info('==>', '/' + __dirname)
const app = createApp({
  template: `
  <div id="app">
      <h1>Basic</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/foo">/foo</router-link></li>
        <li><router-link to="/bar">/bar</router-link></li>
        <router-link tag="li" to="/bar" :event="['mousedown', 'touchstart']">
          <a>/bar</a>
        </router-link>
        <li><router-link to="/é">/é</router-link></li>
        <li><router-link to="/é?t=%25ñ">/é?t=%ñ</router-link></li>
        <li><router-link to="/é#%25ñ">/é#%25ñ</router-link></li>
        <router-link to="/foo" v-slot="props">
          <li :class="[props.isActive && 'active', props.isExactActive && 'exact-active']">
            <a :href="props.href" @click="props.navigate">{{ props.route.path }} (with v-slot).</a>
          </li>
        </router-link>
        <li><router-link to="/foo" replace>/foo (replace)</router-link></li>
      </ul>
      <button id="navigate-btn" @click="navigateAndIncrement">On Success</button>
      <pre>
        {{route}}
      </pre>
      <pre id="counter">callback not work ->{{ n }}</pre>
      <pre id="query-t">{{ route.query.t }}</pre>
      <pre id="hash">{{ route.hash }}</pre>
      <router-view class="view"></router-view>
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

