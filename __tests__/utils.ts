import { JSDOM, ConstructorOptions } from 'jsdom'
import {
  NavigationGuard,
  RouteRecordMultipleViews,
  MatcherLocationNormalized,
  RouteLocationNormalized,
<<<<<<< HEAD
} from '../src/types'
import { h, resolveComponent } from 'vue'
=======
  RouteRecordCommon,
  RouteComponent,
} from '../src/types'
import { h, resolveComponent, ComponentOptions } from 'vue'
>>>>>>> 998ca92d2040cb5951839fb03a4b954e5507f825

export const tick = (time?: number) =>
  new Promise(resolve => {
    if (time) setTimeout(resolve, time)
    else process.nextTick(resolve)
  })

<<<<<<< HEAD
=======
export async function ticks(n: number) {
  for (let i = 0; i < n; i++) {
    await tick()
  }
}

>>>>>>> 998ca92d2040cb5951839fb03a4b954e5507f825
export type NAVIGATION_METHOD = 'push' | 'replace'
export const NAVIGATION_TYPES: NAVIGATION_METHOD[] = ['push', 'replace']

export interface RouteRecordViewLoose
  extends Pick<
    RouteRecordMultipleViews,
    'path' | 'name' | 'components' | 'children' | 'meta' | 'beforeEnter'
  > {
  leaveGuards?: any
<<<<<<< HEAD
=======
  instances: Record<string, any>
  props?: RouteRecordCommon['props']
>>>>>>> 998ca92d2040cb5951839fb03a4b954e5507f825
  aliasOf: RouteRecordViewLoose | undefined
}

// @ts-ignore we are intentionally overriding the type
export interface RouteLocationNormalizedLoose extends RouteLocationNormalized {
  name: string | undefined
  path: string
  // record?
  params: any
  redirectedFrom?: Partial<MatcherLocationNormalized>
  meta: any
  matched: Partial<RouteRecordViewLoose>[]
}

export interface MatcherLocationNormalizedLoose {
  name: string
  path: string
  // record?
  params: any
  redirectedFrom?: Partial<MatcherLocationNormalized>
  meta: any
  matched: Partial<RouteRecordViewLoose>[]
<<<<<<< HEAD
=======
  instances: Record<string, any>
>>>>>>> 998ca92d2040cb5951839fb03a4b954e5507f825
}

declare global {
  namespace NodeJS {
    interface Global {
      window: JSDOM['window']
      location: JSDOM['window']['location']
      document: JSDOM['window']['document']
      before?: Function
    }
  }
}

export function createDom(options?: ConstructorOptions) {
  const dom = new JSDOM(
    `<!DOCTYPE html><html><head></head><body></body></html>`,
    {
      url: 'https://example.org/',
      referrer: 'https://example.com/',
      contentType: 'text/html',
      ...options,
    }
  )

  global.window = dom.window
  global.location = dom.window.location
  global.document = dom.window.document

  return dom
}

export const noGuard: NavigationGuard = (to, from, next) => {
  next()
}

export const components = {
  Home: { render: () => h('div', {}, 'Home') },
  Foo: { render: () => h('div', {}, 'Foo') },
  Bar: { render: () => h('div', {}, 'Bar') },
<<<<<<< HEAD
=======
  User: {
    props: {
      id: {
        default: 'default',
      },
    },
    render() {
      // @ts-ignore
      return h('div', {}, 'User: ' + this.id)
    },
  } as ComponentOptions,
  WithProps: {
    props: {
      id: {
        default: 'default',
      },
      other: {
        default: 'other',
      },
    },
    render() {
      // @ts-ignore
      return h('div', {}, `id:${this.id};other:${this.other}`)
    },
  } as RouteComponent,
>>>>>>> 998ca92d2040cb5951839fb03a4b954e5507f825
  Nested: {
    render: () => {
      const RouterView = resolveComponent('RouterView')
      return h('div', {}, [
        h('h2', {}, 'Nested'),
        RouterView ? h(RouterView as any) : [],
      ])
    },
  },
}
