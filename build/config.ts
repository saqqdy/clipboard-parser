import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import chalk from 'chalk'
import pkg from '../package.json' assert { type: 'json' }

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const banner =
	'/*!\n' +
	' * ' +
	pkg.name +
	' v' +
	pkg.version +
	'\n' +
	' * ' +
	pkg.description +
	'\n' +
	' * (c) 2023-' +
	new Date().getFullYear() +
	' saqqdy \n' +
	' * Released under the MIT License.\n' +
	' */'

export const externals = {}

export const version = pkg.version

export const extensions = [
	'.js',
	'.mjs',
	'.cjs',
	'.jsx',
	'.ts',
	'.mts',
	'.cts',
	'.tsx',
	'.es6',
	'.es',
	'.json',
	'.less',
	'.css'
]

export const alias = {
	'@': resolve(__dirname, '..', 'src'),
	'clipboard-parser': resolve(__dirname, '..')
}

export const reporter = (opt: any, outputOptions: any, info: any) =>
	`${chalk.cyan(
		chalk.bold(
			outputOptions.file ? `${outputOptions.file.split('src/').pop()}` : info.fileName || ''
		)
	)}: bundle size ${chalk.yellow(info.bundleSize)} -> minified ${chalk.green(
		(info.minSize && `${info.minSize}`) || ''
	)}`
