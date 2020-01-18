
let webpack = require('webpack')

let MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	entry: './example/App.js',
	output: {
		filename: 'main.js',
		path: __dirname + '/docs'
	},
	module: {
		rules: [
			{
				test: /\.styl$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: true,
							reloadAll: true
						}
					},
					{
						loader: 'css-loader',
						options: {
							modules: false
						}
					},
					{
						loader: 'stylus-loader',
						options: {
							use: [require('autoprefixer-stylus')()]
						}
					}
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
		new webpack.ProvidePlugin({
			React: 'react',
			ReactDOM: 'react-dom'
		})
	],
	devServer: {
		contentBase: './example',
		inline: true,
		hot: true,
		port: 80
	}
}