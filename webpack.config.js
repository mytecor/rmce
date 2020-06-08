
let CssExtract = require('extract-css-chunks-webpack-plugin')

module.exports = {
	stats: 'minimal',
	entry: './example/App.js',
	output: {
		filename: 'bundle.js',
		path: __dirname + '/example'
	},
	module: {
		rules: [
			{
				test: /\.styl$/,
				use: [
					CssExtract.loader,
					'css-loader',
					{
						loader: 'stylus-native-loader',
						options: {
							use: [require('autoprefixer-stylus')()]
						}
					}
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		],
	},
	plugins: [
		new CssExtract({
			filename: 'bundle.css',
		})
	],
	devServer: {
		publicPath: '/example/',
		inline: true,
		hot: true,
		port: 80
	}
}