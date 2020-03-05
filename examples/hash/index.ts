import { createRouter, createHashHistory, useRoute } from '../../src'
import { RouteComponent } from '../../src/types'
import { createApp, defineComponent, computed } from 'vue'

const component: RouteComponent = {
  template: `<div>A component</div>`,
}

const Home: RouteComponent = {
  template: `
    <div>
        Home
       <pre>
            {{currentLocation}}
        </pre>
        
    </div>`,
  setup() {

    const route = useRoute()
    const currentLocation = computed(() => {
      const { matched, ...rest } = route.value
      return rest

    })
    return { currentLocation }
  },
}

const Document: RouteComponent = {
  template: `<div>Document: {{ $route.params.id }}</div>`,
}

const router = createRouter({
  history: createHashHistory('/' + __dirname),
  routes: [
    { path: '/', component: Home, name: 'home', meta: { h1: true } },
    { path: '/documents/:id', name: 'docs', component: Document },
    { path: encodeURI('/n/€'), name: 'euro', component },
  ],
})

const App = defineComponent({
  template: `
			<div>
					<router-view></router-view>
	
	      <h2>App route object: </h2>
				<pre>
					{{currentLocation}}
        </pre>
		
			</div>
  `,
  // $route 作为保留字，无法使用
  setup() {
    const route = useRoute()
    const currentLocation = computed(() => {
      const { matched, ...rest } = route.value
      return rest
    })
    return {
      currentLocation,
    }
  },

})

declare global {
  interface Window {
    vm: any;
  }
}
const app = createApp(App)
app.use(router)
app.mount('#app')
window.vm = app
