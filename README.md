# vue-router-next [![CircleCI](https://circleci.com/gh/vuejs/vue-router-next.svg?style=svg)](https://circleci.com/gh/vuejs/vue-router-next)

<<<<<<< HEAD
## 状态: Alpha

当前的代码库在Vue Router v3.x上具有大多数现有功能，并且是可用的。 支持所有 [merged RFCs](https://github.com/vuejs/rfcs/pulls?q=is%3Apr+is%3Amerged+label%3Arouter).

由于库仍然不稳定,而且**我们希望得到关于错误和缺少功能的反馈**，**它可能会经历一些突破性的变化**。

## 已知 issues

### 与vue-router@3.x比较有大改动

- `mode: 'history'` -> `history: createWebHistory()`
- 捕捉所有路由 (`/*`) ，现在必须使用带有自定义regex的参数定义: `/:catchAll(.*)`

### 缺少的features

- `keep-alive` 尚未支持
=======
## Status: Alpha

The current codebase has most of the existing features on Vue Router v3.x and is usable. It supports all the [merged RFCs](https://github.com/vuejs/rfcs/pulls?q=is%3Apr+is%3Amerged+label%3Arouter).

Since the library is still unstable **and because we want feedback** on bugs and missing features, **it will probably go through a few breaking changes**.

## Known issues

### Breaking changes compared to vue-router@3.x

- `mode: 'history'` -> `history: createWebHistory()`
- Catch all routes (`/*`) must now be defined using a parameter with a custom regex: `/:catchAll(.*)`

### Missing features

- `keep-alive` is not yet supported
>>>>>>> 998ca92d2040cb5951839fb03a4b954e5507f825
- Partial support of per-component navigation guards. No `beforeRouteEnter`

## Contributing

<<<<<<< HEAD
官方vue-router-next 见 [Contributing Guide](https://github.com/vuejs/vue-router-next/blob/master/.github/contributing.md).

## About
词库为本人fork 官方的学习库
=======
See [Contributing Guide](https://github.com/vuejs/vue-router-next/blob/master/.github/contributing.md).
>>>>>>> 998ca92d2040cb5951839fb03a4b954e5507f825
