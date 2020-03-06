import { createRouter, createWebHistory, useRoute } from '../../src'
import { RouteComponent } from '../../src/types'
import { createApp } from 'vue'

const Home: RouteComponent = {
  template: `
    <div class="home">
      <h2>Home</h2>
      <p>hello</p>
    </div>
  `,
}

const Parent: RouteComponent = {
  setup(){
    // beforeRouteUpdate(to: any, from: any, next: any) {
    //   const toDepth = to.path.split('/').length
    //   const fromDepth = from.path.split('/').length
    //   this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    //   next()
    // },
    return {
      transitionName: 'slide-left',
    }
  },

  template: `
			<div class="parent">
					<h2>Parent</h2>
					<transition :name="transitionName">
							<router-view class="child-view"></router-view>
					</transition>
			</div>
  `,
}

const Default: RouteComponent = { template: '<div class="default">default</div>' }
const Foo: RouteComponent = { template: '<div class="foo">foo</div>' }
const Bar: RouteComponent = { template: '<div class="bar">bar</div>' }

const router: any = createRouter({
  history: createWebHistory('/' + __dirname),
  routes: [
    { path: '/', component: Home },
    {
      path: '/parent', component: Parent,
      children: [
        { path: '', component: Default },
        { path: 'foo', component: Foo },
        { path: 'bar', component: Bar },
      ],
    },
  ],
})
const app = createApp({
  template: `
  <div>
       <h1>Transitions</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/parent">/parent</router-link></li>
        <li><router-link to="/parent/foo">/parent/foo</router-link></li>
        <li><router-link to="/parent/bar">/parent/bar</router-link></li>
      </ul>
      <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
      </transition>
      <pre>
      {{route}}
      </pre>
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

