module.exports = {
	presets: [
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
