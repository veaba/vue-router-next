import { createRouter, createWebHistory, useRoute } from '../../src'
import { RouteComponent } from '../../src/types'
import { createApp, inject, ref } from 'vue'
import { getPost } from './api'

const Home: RouteComponent = { template: '<div>home</div>' }

const Post: RouteComponent = {
  template: `
			<div class="post">
					<div class="loading" v-if="loading">Loading...</div>
					<div v-if="error" class="error">
							{{ error}}
					</div>
					<!--
             @ todo The following comments cannot be included in the transition, otherwise a Vue warning will be raised
             giving the post container a unique key triggers transitions
             when the post id changes.
           -->
					<transition name="slide">
							
							<div v-if="post" class="content" :key="post.id">
									<h2>{{ post.title }}</h2>
									<p>{{ post.body }}</p>
							</div>
					
					</transition>
			</div>
  `,
  setup() {
    const route: any = inject('route')
    let post: any = ref(0) || {}
    let error: any = ref(0)
    let loading: any = ref(0)
    const fetchData = () => {
      post.value = {}
      error.value = ''
      loading.value = true
      console.info(route.value.params.id)
      getPost(route.value.params.id, (err: any, postData: any) => {
        loading.value = false
        if (err) {
          error.value = err.toString()
        } else {
          post.value = postData
        }
      })
    }
    return {
      route,
      loading,
      post,
      error,
      fetchData,
    }
  },
  watch: {
    'route': 'fetchData',
  },
  style: `
    <style>
    .loading {
      position: absolute;
      top: 10px;
      right: 10px;
    }
    .error {
      color: red;
    }
    .content {
      transition: all .35s ease;
      position: absolute;
    }
    .slide-enter {
      opacity: 0;
      transform: translate(30px, 0);
    }
    .slide-leave-active {
      opacity: 0;
      transform: translate(-30px, 0);
    }
    </style>
  `,
}
const router: any = createRouter({
  history: createWebHistory('/' + __dirname),
  routes: [
    { path: '/', component: Home },
    { path: '/post/:id', component: Post },
  ],
})

const app = createApp({
  template: `
			<div>
					<h1>Data Fetching</h1>
					<ul>
							<li>
									<router-link to="/">/</router-link>
							</li>
							<li>
									<router-link to="/post/1">/post/1</router-link>
							</li>
							<li>
									<router-link to="/post/2">/post/2</router-link>
							</li>
							<li>
									<router-link to="/post/3">/post/3</router-link>
							</li>
					</ul>
					<router-view class="view"></router-view>
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

