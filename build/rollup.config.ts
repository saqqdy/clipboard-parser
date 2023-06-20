import type { InternalModuleFormat, OutputOptions, Plugin, RollupOptions } from 'rollup'
import nodeResolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import filesize from 'rollup-plugin-filesize'
import { visualizer } from 'rollup-plugin-visualizer'
import { banner, extensions, reporter } from './config'

export interface Config {
	input: string
	file: string
	format: InternalModuleFormat
	browser?: boolean
	minify?: boolean
	transpile?: boolean
	env: 'development' | 'production'
	plugins?: Plugin[]
}

export interface Output extends OutputOptions {
	plugins: Plugin[]
}

export interface Options extends RollupOptions {
	external: string[]
	plugins: Plugin[]
	output: Output
}

const configs: Config[] = [
	{
		input: 'src/index.ts',
		file: 'dist/index.esm-browser.js',
		format: 'es',
		browser: true,
		env: 'development'
	},
	{
		input: 'src/index.ts',
		file: 'dist/index.esm-browser.prod.js',
		format: 'es',
		browser: true,
		minify: true,
		env: 'production'
	},
	{
		input: 'src/index.ts',
		file: 'dist/index.esm-bundler.js',
		format: 'es',
		env: 'development'
	},
	{
		input: 'src/index.ts',
		file: 'dist/index.mjs',
		format: 'es',
		env: 'development'
	},
	{
		input: 'src/index.ts',
		file: 'dist/index.global.js',
		format: 'iife',
		env: 'development'
	},
	{
		input: 'src/index.ts',
		file: 'dist/index.global.prod.js',
		format: 'iife',
		minify: true,
		env: 'production'
	},
	{
		input: 'src/index.ts',
		file: 'dist/index.cjs.js',
		format: 'cjs',
		env: 'development'
	}
]

function createEntries() {
	return configs.map(createEntry)
}

function createEntry(config: Config) {
	const isGlobalBuild = config.format === 'iife'
	const isTypeScript = config.input.endsWith('.ts')
	const isTranspiled =
		config.input.endsWith('bundler.js') ||
		config.input.endsWith('browser.js') ||
		config.input.endsWith('prod.js')

	const _config: Options = {
		external: [],
		input: config.input,
		plugins: [],
		output: {
			file: config.file,
			format: config.format,
			exports: 'auto',
			sourcemap: false,
			extend: true,
			plugins: [],
			globals: {}
		},
		onwarn: (msg: any, warn) => {
			if (!/Circular/.test(msg)) {
				warn(msg)
			}
		}
	}

	if (isGlobalBuild || config.browser) _config.output.banner = banner

	if (isGlobalBuild) {
		_config.output.name = _config.output.name || 'clipboardParser'
	}

	if (!isGlobalBuild) {
		_config.external.push('core-js', 'js-cool')
	}

	_config.plugins.push(nodeResolve(), commonjs())

	if (config.transpile !== false) {
		!isTranspiled &&
			_config.plugins.push(
				babel({
					babelHelpers: 'bundled',
					extensions,
					exclude: [/node_modules[\\/]core-js/]
				})
			)
		isTypeScript &&
			_config.plugins.push(
				typescript({
					compilerOptions: {
						declaration: false
					}
				})
			)
	}

	if (config.minify) {
		_config.plugins.push(terser({ module: config.format === 'es' }))
	}

	_config.plugins.push(
		cleanup({
			comments: 'all'
		}),
		filesize({ reporter }),
		visualizer()
	)

	return _config
}

export default createEntries()
