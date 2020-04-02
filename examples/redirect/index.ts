import { createRouter, createWebHistory, useRoute } from '../../src'
import { RouteComponent } from '../../src/types'
import { createApp, ref } from 'vue'

const Home: RouteComponent = { template: '<router-view></router-view>' }
const Default: RouteComponent = { template: '<div>default</div>' }
const Foo: RouteComponent = { template: '<div>foo</div>' }
const Bar: RouteComponent = { template: '<div>bar</div>' }
const Baz: RouteComponent = { template: '<div>baz</div>' }
const WithParams: RouteComponent = { template: '<div>{{ route.params.id }}</div>' }
// const Foobar:RouteComponent = { template: '<div>foobar</div>' }
// const FooBar:RouteComponent = { template: '<div>FooBar</div>' }


const router: any = createRouter({
  history: createWebHistory('/' + __dirname),
  routes: [
    {
      path: '/', component: Home,
      children: [
        { path: '', component: Default },
        { path: 'foo', component: Foo },
        { path: 'bar', component: Bar },
        { path: 'baz', name: 'baz', component: Baz },
        { path: 'with-params/:id', component: WithParams },
        // relative redirect to a sibling route
        { path: 'relative-redirect', redirect: '/foo' },
      ],
    },
    // absolute redirect
    { path: '/absolute-redirect', redirect: '/bar' },
    // dynamic redirect, note that the target route `to` is available for the redirect function
    {
      path: '/dynamic-redirect/:id?',
      redirect: to => {
        const { hash, params, query } = to
        if (query.to === 'foo') {
          return { path: '/foo', query: null }
        }
        if (hash === '#baz') {
          return { name: 'baz', hash: '' }
        }
        if (params.id) {
          return '/with-params/:id'
        } else {
          return '/bar'
        }
      },
    },
    // named redirect
    { path: '/named-redirect', redirect: { name: 'baz' } },

    // redirect with params
    { path: '/redirect-with-params/:id', redirect: '/with-params/:id' },

    // todo no supported yet
    // redirect with caseSensitive
    // { path: '/foobar', component: Foobar, caseSensitive: true },

    // todo no supported yet
    // redirect with pathToRegexpOptions
    // { path: '/FooBar', component: FooBar, pathToRegexpOptions: { sensitive: true }},

    // todo no supported yet
    // catch all redirect
    // { path: '*', redirect: '/' },
  ],
})
console.info('==>', '/' + __dirname)
const app = createApp({
  template: `
  <div>
         <h1>Redirect</h1>
      <ul>
        <li><router-link to="/relative-redirect">
          /relative-redirect (redirects to /foo)
        </router-link></li>

        <li><router-link to="/relative-redirect?foo=bar">
          /relative-redirect?foo=bar (redirects to /foo?foo=bar)
        </router-link></li>

        <li><router-link to="/absolute-redirect">
          /absolute-redirect (redirects to /bar)
        </router-link></li>

        <li><router-link to="/dynamic-redirect">
          /dynamic-redirect (redirects to /bar)
        </router-link></li>

        <li><router-link to="/dynamic-redirect/123">
          /dynamic-redirect/123 (redirects to /with-params/123)
        </router-link></li>

        <li><router-link to="/dynamic-redirect?to=foo">
          /dynamic-redirect?to=foo (redirects to /foo)
        </router-link></li>

        <li><router-link to="/dynamic-redirect#baz">
          /dynamic-redirect#baz (redirects to /baz)
        </router-link></li>

        <li><router-link to="/named-redirect">
          /named-redirect (redirects to /baz)
        </router-link></li>

        <li><router-link to="/redirect-with-params/123">
          /redirect-with-params/123 (redirects to /with-params/123)
        </router-link></li>

        <li><router-link to="/foobar">
          /foobar
        </router-link></li>

        <li><router-link to="/FooBar">
          /FooBar
        </router-link></li>

        <li><router-link to="/not-found">
          /not-found (redirects to /)
        </router-link></li>
      </ul>
      <router-view class="view"></router-view>
    </div>
  `,
  setup() {
    const route: any = useRoute()
    const n = ref(0)
    const navigateAndIncrement = () => {
      // callback don't work
      const increment = () => {
        console.info(111)
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
      navigateAndIncrement
    }
  },
})
app.use(router)
app.mount('#app')

