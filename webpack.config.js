const path = require('path');

module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',
	entry: './fall-challenge-2023/fall-challenge-2023.js',
	output: {
		filename: 'main.js',
		path: path.resolve('./', 'dist'),
	},
	optimization: {
		minimize: false,
	},
};
