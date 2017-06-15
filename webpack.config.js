var path = require('path')

module.exports = {
	entry: {
		'index': path.resolve(__dirname, 'src/index.js'),
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015', 'react']
			}
		}, {
			test: /\.styl?$/,
			loader: 'style-loader!css-loader!stylus-loader'
		}]
	}
}