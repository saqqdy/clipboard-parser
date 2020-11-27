module.exports = {
	presets: [
		'@babel/preset-react',
		[
			'@babel/preset-env',
			{
				useBuiltIns: 'entry',
				corejs: 3,
				targets: '> 0.5%, not dead'
			}
		]
	]
}
