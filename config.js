const path = require('path')
const fs = require('fs')
const pkg = require('./package.json')
// const nodeExternals = require('webpack-node-externals')
let externals = {}

// externals = [Object.assign({}, externals), nodeExternals() /*, /^core-js\/.+$/, /^js-cool\/.+$/*/]

exports.banner = '/*!\n' + ' * ' + pkg.name + ' v' + pkg.version + '\n' + ' * ' + pkg.description + '\n' + ' * (c) 2020-' + new Date().getFullYear() + ' saqqdy \n' + ' * Released under the MIT License.\n' + ' */'
exports.bannerText = pkg.name + ' v' + pkg.version + '\n' + pkg.description + '\n' + '(c) 2021-' + new Date().getFullYear() + ' saqqdy \n' + 'Released under the MIT License.'
exports.externals = externals
exports.version = pkg.version

exports.extensions = ['.js', '.jsx', '.ts', '.tsx', '.es6', '.es', '.mjs', '.ts', '.json']

exports.alias = {
    '@': path.resolve(__dirname, '../src'),
    postmessager: path.resolve(__dirname, './')
}

exports.jsexclude = /node_modules/
