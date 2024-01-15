const path = require('path');

module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',
	entry: './spring-challenge-2020/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve('./', 'dist'),
	},
	optimization: {
		minimize: false,
	},
};
