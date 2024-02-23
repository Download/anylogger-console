import fs from 'fs'
import UglifyJS from 'uglify-js'
import { gzipSizeSync } from 'gzip-size'
// be uber cool and use anylogger-console to print the logging in the build of anylogger-console :)
import adapter from 'anylogger-console'
import anylogger from 'anylogger'
adapter(anylogger)
var log = anylogger('anylogger-console')

var [ processName, script, command, ...args ] = process.argv
var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))
var v = pkg.version

;(function(){
  var data = fs.readFileSync(pkg.iife, 'utf8')

  if (!command || command == 'minify') {
    data = UglifyJS.minify(data);
    if (data.error) {
      return log('error', data)
    }
    data = data.code;
    fs.writeFileSync(pkg.min, data, 'utf8')
  }
  else {
    data = fs.readFileSync(pkg.min, 'utf8')
  }

  var min = data.length
  var gzip = gzipSizeSync(data)

  if (!command || command == 'minify') {
    log('info', 'created ' + pkg.min + ' (' + min + 'B, gzipped ~' + gzip + 'B)')
  }

  var av = pkg.devDependencies.anylogger.substring(1)

  if (!command || command == 'docs') {
    var readme = fs.readFileSync('README.md', 'utf-8')
    readme = readme.replace(/minified \d\d\d bytes/g, 'minified ' + min + ' bytes')
    readme = readme.replace(/\[\d\d\d\]\(#gzip-size\)/g, '[' + gzip + '](#gzip-size)')
    readme = readme.replace(/\<sub\>\<sup\>\d(\d)?\.\d(\d)?\.\d(\d)?(-([a-zA-Z0-9\.])*)?\<\/sup\>\<\/sub\>/g, `<sub><sup>${v}</sup></sub>`)
    readme = readme.replace(/anylogger-console\@\d(\d)?\.\d(\d)?\.\d(\d)?(-([a-zA-Z0-9\.])*)?\//g, `anylogger-console@${v}/`)
    readme = readme.replace(/anylogger\@\d(\d)?\.\d(\d)?\.\d(\d)?(-([a-zA-Z0-9\.])*)?\//g, `anylogger@${av}/`)
    // readme = readme.replace(/\>\=\d(\d)?\.\d(\d)?\.\d(\d)?/g, `>=${v}`)
    fs.writeFileSync('README.md', readme, 'utf8')
    log.info('updated readme')
    var html = fs.readFileSync('test.html', 'utf-8')
    html = html.replace(/anylogger-console \d(\d)?\.\d(\d)?\.\d(\d)?(-([a-zA-Z0-9\.])*)?/g, `anylogger-console ${v}`)
    html = html.replace(/anylogger\@\d(\d)?\.\d(\d)?\.\d(\d)?(-([a-zA-Z0-9\.])*)?\//g, `anylogger@${av}/`)
    fs.writeFileSync('test.html', html, 'utf8')
    log.info('updated test.html')
  }
})()