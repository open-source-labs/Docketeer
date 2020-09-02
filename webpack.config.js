const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: ['./src/index.js'],
	output: {
		path: path.join(__dirname, '/build/'),
		filename: 'bundle.js'
	},
	mode: process.env.NODE_ENV,
	module: {
		rules: [
			{
				test: /\.jsx?/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				}
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
		]
	},
	// devServer: {
	// 	port: 8080,
	// 	// contentBase: path.resolve(__dirname, 'src'),
	// 	publicPath: '/build/',
	// 	hot: true,
	// 	proxy: {
	// 		'/api': 'http://localhost:3000'
	// 	}
	// },
	devServer: {
		historyApiFallback: true,
		contentBase: './',
		port: 4172
	},
	devtool: 'eval',
	externals: {
		child_process: "require('child_process')",
	},
};