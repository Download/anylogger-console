# anylogger-console <sub><sup>1.0.0</sup></sub>
### Anylogger adapter for the console

[![npm](https://img.shields.io/npm/v/anylogger-console.svg)](https://npmjs.com/package/anylogger-console)
[![license](https://img.shields.io/npm/l/anylogger-console.svg)](https://opensource.org/licenses/MIT)
[![travis](https://img.shields.io/travis/Download/anylogger-console.svg)](https://travis-ci.org/Download/anylogger-console)
![mind BLOWN](https://img.shields.io/badge/mind-BLOWN-ff69b4.svg)

<sup><sub><sup><sub>.</sub></sup></sub></sup>

## What is this?
This is an [anylogger](https://npmjs.com/package/anylogger) adapter for the console.

This package is meant for application projects that are using libraries using
`anylogger`. By including this adapter in your project, all libraries using
`anylogger` will automatically start to use the browser console as their logging framework.

## Download

* [anylogger-console.js](https://unpkg.com/anylogger-console@1.0.0/anylogger-console.js)
  (fully commented source ~5kB)
* [anylogger-console.min.js](https://unpkg.com/anylogger-console@1.0.0/anylogger-console.min.js)
  (minified 177 bytes, gzipped ~[148](#gzip-size) bytes)


## CDN

*index.html*
```html
<script src="https://unpkg.com/anylogger@1.0.6/anylogger.min.js"></script>
<script src="https://unpkg.com/anylogger-console@1.0.2"></script>
<script>(function(){ // IIFE
  var log = anylogger('index.html')
  log.info('Logging is simple!')
})()</script>
```

## Install

Install `anylogger` and this adapter:

```sh
npm install --save anylogger anylogger-console
```

## Include in your application project
This package is meant for application projects. If you are writing a library to
be NPM installed into some other project, most likely you should not include
any adapter, but instead just use `anylogger` directly.

The `anylogger-console` adapter will modify the `anylogger` factory in such a
way that the loggers it creates will be logging to the console.

To activate the adapter, include it in your application entry point.

### Require

*main.js*
```js
require('anylogger-console')
```

### Import

*main.js*
```js
import 'anylogger-console'
```

## Logging in the application project
In your application module code, only use anylogger to stay framework
independent:

*my-module.js*
```js
import anylogger from 'anylogger'
const log = anylogger('my-module')
log('Logging is simple!')
```

This is helpful if you ever decide to factor out the application module into a
separate library.


## Issues

Add an issue in this project's
[issue tracker](https://github.com/download/anylogger-console/issues)
to let me know of any problems you find, or questions you may have.


## Copyright

© 2020 by [Stijn de Witt](https://stijndewitt.com). Some rights reserved.


## License

Licensed under the [MIT Open Source license](https://opensource.org/licenses/MIT).

## gzip-size
The GZIP algorithm is available in different flavours and with different
possible compression settings. The sizes quoted in this README have been
measured using [gzip-size](https://npmjs.com/package/gzip-size)
by [Sindre Sorhus](https://github.com/sindresorhus), your mileage may vary.
