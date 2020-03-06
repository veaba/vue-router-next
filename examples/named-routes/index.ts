import { createRouter, createWebHistory, useRoute } from '../../src'
import { RouteComponent } from '../../src/types'
import { createApp, ref } from 'vue'

const Home: RouteComponent = { template: '<div>This is Home</div>' }
const Foo: RouteComponent = { template: '<div>This is Foo</div>' }
const Bar: RouteComponent = { template: '<div>This is Bar {{ route.params.id }}</div>' }

const router: any = createRouter({
  history: createWebHistory('/' + __dirname),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/foo', name: 'foo', component: Foo },
    { path: '/bar/:id', name: 'bar', component: Bar },
  ],
})
console.info('==>', '/' + __dirname)
const app = createApp({
  template: `
      <div>
      <h1>Named Routes</h1>
      <p>Current route name: {{ route.name }}</p>
      <ul>
        <li><router-link :to="{ name: 'home' }">home</router-link></li>
        <li><router-link :to="{ name: 'foo' }">foo</router-link></li>
        <!-- not supported yet -->
        <li><router-link :to="{ name: 'bar', params: { id: 123 }}">bar</router-link></li>
      </ul>
      <router-view class="view"></router-view>
      <pre>{{route}}</pre>
    </div>
  `,
  setup() {
    const route: any = useRoute()
    const n = ref(0)
    const navigateAndIncrement = () => {
      // callback don't work
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

