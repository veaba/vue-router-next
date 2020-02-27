import { createRouter, createHashHistory } from '../../src'
import { RouteComponent } from '../../src/types'
import { createApp,defineComponent } from 'vue'

const component: RouteComponent = {
  template: `<div>A component</div>`,
}

const Home: RouteComponent = {
  template: `<div>Home</div>`,
}

const Document: RouteComponent = {
  template: `<div>Document: {{ $route.params.id }}</div>`,
}

const router = createRouter({
  history: createHashHistory('/' + __dirname),
  routes: [
    { path: '/', component: Home, name: 'home' },
    { path: '/documents/:id', name: 'docs', component: Document },
    { path: encodeURI('/n/€'), name: 'euro', component },
  ],
})

const App=defineComponent({
  template:`
  <div> {{router}}</div>
  `,
  setup(){
    return {
      router
    }
  }

})

declare global {
  interface Window {
    vm: any;
  }
}
const app = createApp(App)
app.use(router)
app.mount('#app')

window.vm=app
