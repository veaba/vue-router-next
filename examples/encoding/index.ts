import { createRouter, createHistory } from '../../src'
import { RouteComponent } from '../../src/types'
import { createApp } from 'vue'

const component: RouteComponent = {
  template: `<div>A component</div>`,
}

const Home: RouteComponent = {
  template: `<div>Home,</div>`,
}

const Document: RouteComponent = {
  template: `<div>Document: {{ $route.params.id }}</div>`,
}

const router = createRouter({
  history: createHistory('/' + __dirname),
  routes: [
    { path: '/', component: Home, name: 'home' },
    { path: '/documents/:id', name: 'docs', component: Document },
    { path: encodeURI('/n/€'), name: 'euro', component },
  ],
})
const app = createApp(component)
app.use(router)
app.mount('#app')

