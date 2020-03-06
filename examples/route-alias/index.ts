import { createRouter, createWebHistory, useRoute } from '../../src'
import { RouteComponent } from '../../src/types'
import { createApp } from 'vue'

const Root:RouteComponent = { template: '<div>root</div>' }
const Home:RouteComponent = { template: '<div><h1>Home</h1><router-view></router-view></div>' }
const Foo:RouteComponent = { template: '<div>foo</div>' }
const Bar:RouteComponent = { template: '<div>bar</div>' }
const Baz:RouteComponent = { template: '<div>baz</div>' }
const Default:RouteComponent = { template: '<div>default</div>' }
const Nested:RouteComponent = { template: '<router-view/>' }
const NestedFoo:RouteComponent = { template: '<div>nested foo</div>' }



const router: any = createRouter({
  history: createWebHistory('/' + __dirname),
  routes: [
    { path: '/root', component: Root, alias: '/root-alias' },
    { path: '/home', component: Home,
      children: [
        // absolute alias
        { path: 'foo', component: Foo, alias: '/foo' },
        // relative alias (alias to /home/bar-alias)
        { path: 'bar', component: Bar, alias: 'bar-alias' },
        // multiple aliases
        { path: 'baz', component: Baz, alias: ['/baz', 'baz-alias'] },
        // default child route with empty string as alias.
        { path: 'default', component: Default, alias: '' },
        // nested alias
        { path: 'nested', component: Nested, alias: 'nested-alias',
          children: [
            { path: 'foo', component: NestedFoo }
          ]
        }
      ]
    }
  ]
})
const app = createApp({
  template: `
     <div>
      <h1>Route Alias</h1>
      <ul>
        <li><router-link to="/root-alias">
          /root-alias (renders /root)
        </router-link></li>

        <li><router-link to="/foo">
          /foo (renders /home/foo)
        </router-link></li>

        <li><router-link to="/home/bar-alias">
          /home/bar-alias (renders /home/bar)
        </router-link></li>

        <li><router-link to="/baz">
          /baz (renders /home/baz)
        </router-link></li>

        <li><router-link to="/home/baz-alias">
          /home/baz-alias (renders /home/baz)
        </router-link></li>

        <li><router-link to="/home">
          /home (renders /home/default)
        </router-link></li>

        <li><router-link to="/home/nested-alias/foo">
          /home/nested-alias/foo (renders /home/nested/foo)
        </router-link></li>
      </ul>
      <router-view class="view"></router-view>
    </div>
  `,
  setup() {
    const route: any = useRoute()
    return {
      route
    }
  },
})
app.use(router)
app.mount('#app')

