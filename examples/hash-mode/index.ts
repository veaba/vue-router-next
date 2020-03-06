import { createRouter, createWebHashHistory, useRoute } from '../../src'
import { RouteComponent } from '../../src/types'
import { createApp, ref } from 'vue'

const Home: RouteComponent = { template: '<div>home</div>' }
const Foo: RouteComponent = { template: '<div>foo</div>' }
const Bar: RouteComponent = { template: '<div>bar</div>' }
const Unicode: RouteComponent = { template: '<div>unicode:{{route.params.unicode}}</div>' }


console.info('__dirname', __dirname)
const router: any = createRouter({
  history: createWebHashHistory(__dirname),
  routes: [
    { path: '/', component: Home, name: 'home' },
    { path: '/foo', component: Foo, name: 'foo' },
    { path: '/bar', component: Bar, name: 'bar' },
    { path: '/é', component: Unicode, name: 'euro' },
    { path: '/é/:unicode', component: Unicode, name: 'euro-unicode' },
  ],
})
const app = createApp({
  template: `
  <div>
      <h1>Mode: 'hash'</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/foo">/foo</router-link></li>
        <li><router-link to="/bar">/bar</router-link></li>
        <!-- todo attrs tag="li" no support with current version -->
        <router-link tag="li" to="/bar">/bar</router-link>
        <li><router-link to="/é">/é</router-link></li>
        <li><router-link to="/é/ñ">/é/ñ</router-link></li>
        <li><router-link to="/é/ñ?t=%25ñ">/é/ñ?t=%ñ</router-link></li>
        <li><router-link to="/é/ñ#é">/é/ñ#é</router-link></li>
      </ul>
      <button id="navigate-btn" @click="navigateAndIncrement">On Success</button>
      <pre>{{route}}</pre>
      <pre id="query-t">{{ route.query.t }}</pre>
      <pre id="hash">{{ route.hash }}</pre>
      <router-view class="view"></router-view>
    </div>
  `,
  setup() {
    const route: any = useRoute()
    const n = ref(0)
    const navigateAndIncrement = () => {
      const increment = () => {
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

