import { createRouter, createWebHistory, useRoute } from '../../src'
import { createApp } from 'vue'
import { RouteComponent } from '../../src/types'

const Hello: RouteComponent = { template: '<div>home</div>' }

// function dynamicPropsFn (route:any) {
//   const now = new Date()
//   return {
//     name: (now.getFullYear() + parseInt(route.params.years)) + '!'
//   }
// }


const router: any = createRouter({
  history: createWebHistory('/' + __dirname),
  routes: [
    { path: '/', component: Hello }, // No props, no nothing
    // todo not supported yet
    // { path: '/hello/:name', component: Hello, props: true }, // Pass route.params to props
    // { path: '/static', component: Hello, props: { name: 'world' }}, // static values
    // { path: '/dynamic/:years', component: Hello, props: dynamicPropsFn }, // custom logic for mapping between route and props
    // { path: '/attrs', component: Hello, props: { name: 'attrs' }}
  ],
})
console.info('==>', '/' + __dirname)
const app = createApp({
  template: `
      <div>
      <h1>Route props</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/hello/you">/hello/you</router-link></li>
        <li><router-link to="/static">/static</router-link></li>
        <li><router-link to="/dynamic/1">/dynamic/1</router-link></li>
        <li><router-link to="/attrs">/attrs</router-link></li>
      </ul>
      <router-view class="view" foo="123"></router-view>
    </div>
  `,
  setup() {
    const route: any = useRoute()
    return {
      route,
    }
  },
})
app.use(router)
app.mount('#app')

