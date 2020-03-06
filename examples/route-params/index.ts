import { createRouter, createWebHistory, useRoute } from '../../src'
import { RouteComponent } from '../../src/types'
import { createApp } from 'vue'

const Log: RouteComponent = {
  template: `<div class="log">id: {{ route.params.id }}, type: {{ route.params.type }}</div>`,
}

const Logs: RouteComponent = {
  template: `
    <div>
      <pre id="params">{{ to.params }}</pre>
      <router-link :to="to" class="child-link">{{ to.params.type }}</router-link>
      <router-view></router-view>
    </div>
  `,
  setup() {
    return {
      to: {
        name: 'items.logs.type',
        params: { type: 'info' },
      },
    }
  },
}
const router= createRouter({
  history: createWebHistory('/' + __dirname),
  routes: [
    {
      path: '/items/:id/logs',
      component: Logs,
      children: [
        {
          path: ':type',
          name: 'items.logs.type',
          component: Log,
        },
      ],
    },
  ],
})
console.info('==>', '/' + __dirname)
const app = createApp({
  template: `
  <div>
      <h1>Route params</h1>
      <ul>
        <li><router-link to="/items/1/logs">item #1</router-link></li>
        <li><router-link to="/items/2/logs">item #2</router-link></li>
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

