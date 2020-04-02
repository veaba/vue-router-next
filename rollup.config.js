<<<<<<< HEAD
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import ts from 'rollup-plugin-typescript2'
import alias from '@rollup/plugin-alias'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'
=======
import path from 'path'
import ts from 'rollup-plugin-typescript2'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

const pkg = require('./package.json')
const name = pkg.name
>>>>>>> 998ca92d2040cb5951839fb03a4b954e5507f825

const banner = `/*!
  * ${pkg.name} v${pkg.version}
  * (c) ${new Date().getFullYear()} Eduardo San Martin Morote
  * @license MIT
  */`

<<<<<<< HEAD
const exportName = 'VueRouter'

function createEntry(
  {
    format, // Rollup format (iife, umd, cjs, es)
    external = ['vue', '@vue/reactivity', '@vue/runtime-core'], // Rollup external option
    input = 'src/index.ts', // entry point
    env = 'development', // NODE_ENV variable
    minify = false,
    isBrowser = false, // produce a browser module version or not
  } = {
    input: 'src/index.ts',
    env: 'development',
    minify: false,
    isBrowser: false,
  }
) {
  // force production mode when minifying
  if (minify) env = 'production'
  const isProductionBuild =
    process.env.__DEV__ === 'false' || env === 'production'

  const config = {
    input,
    plugins: [
      replace({
        __VERSION__: JSON.stringify(pkg.version),
        __DEV__:
          (format === 'es' && !isBrowser) || format === 'cjs'
            ? // preserve to be handled by bundlers
              `process.env.NODE_ENV !== 'production'`
            : // hard coded dev/prod builds
              !isProductionBuild,
      }),
      alias({
        resolve: ['ts'],
      }),
    ],
    output: {
      banner,
      file: 'dist/vue-router.other.js',
      format,
      globals: {
        '@vue/reactivity': 'Vue',
        '@vue/runtime-core': 'Vue',
        vue: 'Vue',
      },
    },
  }

  if (format === 'iife') {
    // config.input = 'src/entries/iife.ts'
    config.output.file = pkg.unpkg
    config.output.name = exportName
  } else if (format === 'es') {
    config.output.file = isBrowser ? pkg.browser : pkg.module
  } else if (format === 'cjs') {
    config.output.file = 'dist/vue-router.cjs.js'
  }

  if (!external) {
    config.plugins.push(resolve(), commonjs())
  } else {
    config.external = external
  }

  config.plugins.push(
    ts({
      // only check once, during the es version with browser (it includes external libs)
      check: format === 'es' && isBrowser && !minify,
      tsconfigOverride: {
        compilerOptions: {
          // same for d.ts files
          declaration: format === 'es' && isBrowser && !minify,
          module: 'esnext', // we need to override it because mocha requires this value to be commonjs
          target: format === 'iife' || format === 'cjs' ? 'es5' : 'esnext',
        },
      },
    })
  )

  if (minify) {
    config.plugins.push(
      terser({
        module: format === 'es',
        // output: {
        //   preamble: banner,
        // },
      })
    )
    config.output.file = config.output.file.replace(/\.js$/i, '.min.js')
  }

  return config
}

export default [
  // browser-friendly UMD build
  createEntry({ format: 'iife' }),
  createEntry({ format: 'iife', minify: true }),
  createEntry({ format: 'cjs' }),
  // TODO: prod vs env
  createEntry({ format: 'es' }),
  createEntry({ format: 'es', isBrowser: true }),
]
=======
// ensure TS checks only once for each build
let hasTSChecked = false

const outputConfigs = {
  // each file name has the format: `dist/${name}.${format}.js`
  // format being a key of this object
  'esm-bundler': {
    file: pkg.module,
    format: `es`,
  },
  cjs: {
    file: pkg.main,
    format: `cjs`,
  },
  global: {
    file: pkg.unpkg,
    format: `iife`,
  },
  esm: {
    file: pkg.browser,
    format: `es`,
  },
}

const allFormats = Object.keys(outputConfigs)
// in vue-router there are not that many
const packageFormats = allFormats
const packageConfigs = packageFormats.map(format =>
  createConfig(format, outputConfigs[format])
)

// only add the production ready if we are bundling the options
packageFormats.forEach(format => {
  if (format === 'cjs') {
    packageConfigs.push(createProductionConfig(format))
  } else if (format === 'global') {
    packageConfigs.push(createMinifiedConfig(format))
  }
})

export default packageConfigs

function createConfig(format, output, plugins = []) {
  if (!output) {
    console.log(require('chalk').yellow(`invalid format: "${format}"`))
    process.exit(1)
  }

  output.sourcemap = true
  output.banner = banner
  output.externalLiveBindings = false
  output.globals = { vue: 'Vue' }

  const isProductionBuild = /\.prod\.js$/.test(output.file)
  const isGlobalBuild = format === 'global'
  const isRawESMBuild = format === 'esm'
  const isNodeBuild = format === 'cjs'
  const isBundlerESMBuild = /esm-bundler/.test(format)

  if (isGlobalBuild) output.name = 'VueRouter'

  const shouldEmitDeclarations = !hasTSChecked

  const tsPlugin = ts({
    check: !hasTSChecked,
    tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    cacheRoot: path.resolve(__dirname, 'node_modules/.rts2_cache'),
    tsconfigOverride: {
      compilerOptions: {
        sourceMap: output.sourcemap,
        declaration: shouldEmitDeclarations,
        declarationMap: shouldEmitDeclarations,
      },
      exclude: ['__tests__', 'test-dts'],
    },
  })
  // we only need to check TS and generate declarations once for each build.
  // it also seems to run into weird issues when checking multiple times
  // during a single build.
  hasTSChecked = true

  const external = ['vue']

  const nodePlugins = [resolve(), commonjs()]

  return {
    input: `src/index.ts`,
    // Global and Browser ESM builds inlines everything so that they can be
    // used alone.
    external,
    plugins: [
      tsPlugin,
      createReplacePlugin(
        isProductionBuild,
        isBundlerESMBuild,
        // isBrowserBuild?
        isGlobalBuild || isRawESMBuild || isBundlerESMBuild,
        isGlobalBuild,
        isNodeBuild
      ),
      ...nodePlugins,
      ...plugins,
    ],
    output,
    // onwarn: (msg, warn) => {
    //   if (!/Circular/.test(msg)) {
    //     warn(msg)
    //   }
    // },
  }
}

function createReplacePlugin(
  isProduction,
  isBundlerESMBuild,
  isBrowserBuild,
  isGlobalBuild,
  isNodeBuild
) {
  const replacements = {
    __COMMIT__: `"${process.env.COMMIT}"`,
    __VERSION__: `"${pkg.version}"`,
    __DEV__: isBundlerESMBuild
      ? // preserve to be handled by bundlers
        `(process.env.NODE_ENV !== 'production')`
      : // hard coded dev/prod builds
        !isProduction,
    // this is only used during tests
    __TEST__: isBundlerESMBuild ? `(process.env.NODE_ENV === 'test')` : false,
    // If the build is expected to run directly in the browser (global / esm builds)
    __BROWSER__: isBrowserBuild,
    // is targeting bundlers?
    __BUNDLER__: isBundlerESMBuild,
    __GLOBAL__: isGlobalBuild,
    // is targeting Node (SSR)?
    __NODE_JS__: isNodeBuild,
  }
  // allow inline overrides like
  //__RUNTIME_COMPILE__=true yarn build
  Object.keys(replacements).forEach(key => {
    if (key in process.env) {
      replacements[key] = process.env[key]
    }
  })
  return replace(replacements)
}

function createProductionConfig(format) {
  return createConfig(format, {
    file: `dist/${name}.${format}.prod.js`,
    format: outputConfigs[format].format,
  })
}

function createMinifiedConfig(format) {
  const { terser } = require('rollup-plugin-terser')
  return createConfig(
    format,
    {
      file: `dist/${name}.${format}.prod.js`,
      format: outputConfigs[format].format,
    },
    [
      terser({
        module: /^esm/.test(format),
        compress: {
          ecma: 2015,
          pure_getters: true,
        },
      }),
    ]
  )
}
>>>>>>> 998ca92d2040cb5951839fb03a4b954e5507f825
