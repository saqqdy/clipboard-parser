const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const config = require('./config')
let plugins = [new ProgressBarPlugin()]

const baseConfig = {
    mode: 'production',
    target: 'web',
    entry: './src/index.ts',
    output: {
        // path: path.resolve(process.cwd(), './lib'),
        publicPath: '/',
        filename: 'index.umd.js',
        chunkFilename: '[id].js',
        libraryTarget: 'umd',
        libraryExport: 'default',
        library: 'clipboardParser',
        umdNamedDefine: true,
        globalObject: "typeof self !== 'undefined' ? self : this"
    },
    resolve: {
        extensions: config.extensions,
        alias: config.alias,
        modules: ['node_modules']
    },
    externals: config.externals,
    performance: {
        hints: false
    },
    stats: {
        children: false
    },
    optimization: {
        // minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                extractComments: false
            }),
            // 注意位置，必须放在 TerserPlugin 后面，否则生成的注释描述会被 TerserPlugin 或其它压缩插件清掉
            new webpack.BannerPlugin({
                entryOnly: true, // 是否仅在入口包中输出 banner 信息
                banner: config.bannerText
            })
        ]
    },
    plugins: plugins
}

module.exports = [
    merge(baseConfig, {
        output: {
            path: path.resolve(process.cwd(), './lib')
        },
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    include: process.cwd(),
                    exclude: config.jsexclude,
                    loader: 'babel-loader'
                }
            ]
        }
    })
    // merge(baseConfig, {
    //     output: {
    //         path: path.resolve(process.cwd(), './es')
    //     },
    //     module: {
    //         rules: [
    //             {
    //                 test: /\.(ts|js)x?$/,
    //                 include: process.cwd(),
    //                 exclude: config.jsexclude,
    //                 loader: 'babel-loader',
    //                 options: {
    //                     presets: [
    //                         [
    //                             '@babel/preset-env',
    //                             {
    //                                 loose: true,
    //                                 modules: 'auto',
    //                                 useBuiltIns: 'usage',
    //                                 corejs: 3,
    //                                 targets: ['defaults', 'not IE <= 11', 'maintained node versions']
    //                                 // targets: { chrome: '58', ie: '11' }
    //                             }
    //                         ]
    //                     ]
    //                 }
    //             }
    //         ]
    //     }
    // })
]
