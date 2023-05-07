const path = require('path')
const { src, dest, series, parallel } = require('gulp')
const through = require('through2')
const sass = require('sass')
const postcss = require('postcss')
const babel = require('@babel/core')
const rimraf = require('rimraf')
const babelConf = require('./babel.conf')
const postcssConf = require('../postcss.config')

const ENV_MODULE = process.argv.slice(2).indexOf('--es-module') > -1
const DIR = ENV_MODULE
  ? path.join(__dirname, '../es')
  : path.join(__dirname, '../lib')

function rm (cb) {
  rimraf.sync(DIR)
  cb()
}

function style () {
  return src(['../src/**/*.scss', '!../src/**/_*.scss'])
    .pipe(through.obj(function(file, encoding, next) {
      sass.render({ file: file.path }, (err, result) => {
        if (err) {
          next(err)
          return
        } 
        file.contents = result.css
        file.path = file.path.replace(/\.scss$/, '.css');
        this.push(file)
        next()
      })
    }))
    .pipe(through.obj(function(file, encoding, next) {
      const content = file.contents.toString(encoding)
      postcss(postcssConf.plugins).process(content, {
        from: file.path, to: file.path
      }).then(result => {
        file.contents = Buffer.from(result.css)
        this.push(file)
        next()
      }).catch(next)
    }))
    .pipe(dest(DIR))
}

function tsx () {
  const babelConfig = babelConf(ENV_MODULE ? false : 'commonjs')
  return src(['../src/**/*.tsx', '../src/**/*.js'])
    .pipe(through.obj(function(file, encoding, next) {
      babel.transformFile(file.path, babelConfig, (err, result) => {
        if (err) {
          next(err)
          return
        } 
        if (/[\\/]style[\\/]index\.js$/.test(file.path)) {
          result.code = result.code.replace(/index\.scss/g, 'index.css')
        }
        file.contents = Buffer.from(result.code)
        file.path = file.path.replace(/\.tsx$/, '.js');
        this.push(file)
        next()
      })
    }))
    .pipe(dest(DIR))
}

exports.default = series(rm, parallel(style, tsx))