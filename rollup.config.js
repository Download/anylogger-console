import replace from 'rollup-plugin-re'
import pkg from './package.json'

export default [
	{
		input: pkg.src,
		output: [
      // commonjs build
			{ file: pkg.main,  format: 'cjs', strict: false },
		],
		external: [ 'anylogger' ],
	},
	{
		input: pkg.src,
		output: [
      // browser-friendly build
			{ file: pkg.iife,  format: 'iife', strict: false, globals: { anylogger: 'anylogger', debug: 'debug' } },
		],
		external: [ 'anylogger' ],
		plugins: [
			// remove import bloat from iife bundle
			replace({
				patterns: [
					{
						match: /anylogger-console/,
						test: 'import anylogger from \'anylogger\'',
						replace: '',
					}
				]
			})
		],
	},
];
