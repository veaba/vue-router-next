# test 

## Roadmap

- Add feature unit test to jest
- Use vue-router exmaples
- Record: todo item
- Record: bug item
- Record: feature item

## Dynamic matching

## Nested routes

## Navigation

## Named routes

## Named views

## Redirect

### Relative routes
- bug: see [` __test__/router.spec.ts` ](https://github.com/veaba/vue-router-next/blob/test/__test__/router.spec.ts#L238-300)
```text
// createWebHistory('/redirect')
// routes
{
 path:'/',
 children:[
  { path: 'relative-redirect-a', redirect: 'foo' },  // no match, if vue-route,is match success
  { path: 'relative-redirect-b', redirect: '/foo' }, // match success
  ]
}
// link
- to:"/redirect/relative-redirect-a" 
- to:"/redirect/relative-redirect-b" 

```

### Absolute routes
### Redirect alias

## Passing props

## History mode

## Navigation-guards
 
## Meta

## Transitions

## Data fetching

## Scroll behavior

## ParseQuery / stringifyQuery
