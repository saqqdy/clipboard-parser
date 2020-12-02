const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
let plugins = [],
	publicPath = process.env.PUBLIC_PATH || '',
	config = {
		umd: {
			entry: [path.resolve(__dirname, 'src/clipboard-parser.js')],
			output: {
				filename: 'clipboard-parser.umd.js',
				libraryTarget: 'umd',
				sourceMapFilename: 'clipboard-parser.umd.js.map',
				library: 'clipboardParser',
				libraryExport: 'default'
			}
		},
		cm2: {
			// entry: { app: [path.resolve(__dirname, 'src/index.js')] },
			entry: path.resolve(__dirname, 'src/clipboard-parser.js'),
			output: {
				filename: 'clipboard-parser.js',
				chunkFilename: '[id].js',
				libraryTarget: 'commonjs2',
				sourceMapFilename: 'clipboard-parser.js.map',
				library: 'clipboardParser',
				libraryExport: 'default'
			}
		},
		amd: {
			entry: [path.resolve(__dirname, 'src/clipboard-parser.js')],
			output: {
				filename: 'clipboard-parser.amd.js',
				chunkFilename: '[id].amd.js',
				libraryTarget: 'amd',
				sourceMapFilename: 'clipboard-parser.amd.js.map',
				library: 'clipboard-parser'
			}
		}
	}[process.env.ENV_NSP]

module.exports = {
	mode: 'production',
	watch: Boolean(process.env.BUILD_WATCH || false),
	entry: config.entry,
	output: {
		path: path.resolve(__dirname, 'lib'),
		publicPath: publicPath,
		...config.output
	},
	optimization: {
		minimize: !Boolean(process.env.BUILD_WATCH || false),
		// 	runtimeChunk: true,
		minimizer: [
			new TerserPlugin({
				test: /\.js(\?.*)?$/i
			})
		]
	},
	resolve: {
		extensions: ['.js'],
		alias: {
			'@': path.resolve(__dirname, 'src')
		},
		modules: [path.resolve(__dirname, 'src'), 'node_modules']
	},
	module: {
		rules: [
			{
				test: /\.(jsx?|babel|es6|js)$/,
				// include: process.cwd(),
				exclude: /node_modules[\\\/]core-js/,
				loader: 'babel-loader',
				options: {
					exclude: [/node_modules[\\\/]core-js/, /node_modules[\\\/]webpack[\\\/]buildin/],
					presets: [
						[
							'@babel/preset-env',
							{
								useBuiltIns: 'entry',
								corejs: 3,
								targets: '> 0.5%, not dead'
							}
						]
					]
				}
			}
		]
	},
	plugins: plugins
}
