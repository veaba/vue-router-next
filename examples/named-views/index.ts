import { createRouter, createWebHistory, useRoute } from '../../src'
import { RouteComponent } from '../../src/types'
import { createApp, ref } from 'vue'

const Foo: RouteComponent = { template: '<div>foo</div>' }
const Bar: RouteComponent = { template: '<div>bar</div>' }
const Baz: RouteComponent = { template: '<div>baz</div>' }


const router: any = createRouter({
  history: createWebHistory('/' + __dirname),
  routes: [
    {
      path: '/',
      // a single route can define multiple named components
      // which will be rendered into <router-view>s with corresponding names.
      components: {
        default: Foo,
        a: Bar,
        b: Baz,
      },
    },
    {
      path: '/other',
      components: {
        default: Baz,
        a: Bar,
        b: Foo,
      },
    },
  ],
})
const app = createApp({
  template: `
     <div>
      <h1>Named Views</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/other">/other</router-link></li>
      </ul>
      <!-- todo it work,but suffix match is error-->
      <router-view class="view one"></router-view>
      <router-view class="view two" name="a"></router-view>
      <router-view class="view three" name="b"></router-view>
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

