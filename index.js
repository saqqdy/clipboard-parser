module.exports = function (clipdata, readRequestParam = true) {
	let //clipdata = window.clipboardData || e.clipboardData,
		text = clipdata
			.getData('Text')
			.replace(/\r\n/g, '\n')
			.replace(/\r/g, '\n')
			.replace(/[\n\r]+$/, ''),
		isRequestParam = text.indexOf('@RequestParam') > -1,
		notTableData = text.indexOf('\t') === -1 || isRequestParam,
		len,
		rows = text.split('\n'),
		requestParams = []
	rows = rows.map((txt, i) => {
		let arr = txt ? txt.split('\t') : []
		if (i === 0) {
			len = +arr.length
		} else if (len !== arr.length || len === 0) {
			notTableData = true
		}
		arr = arr.map(el => el.replace(/\s+/g, ''))
		return arr
	})
	if (notTableData) {
		rows = rows.map(txt => txt.join('')).join('')
	}
	if (readRequestParam && isRequestParam) {
		rows.replace(/@RequestParam\(([\w="",-]+)\)/g, (a, b) => {
			let param = {}
			if (b.indexOf('=') === -1 && b.indexOf(',') === -1) {
				param = { value: b.replace(/^"([\s\S]*)"$/, '$1') }
			} else {
				let p = b.split(',')
				p = p.map(param => {
					let m = param.split('=')
					if (/^"[\s\S]*"$/.test(m[1])) m[1] = m[1].replace(/^"([\s\S]*)"$/, '$1')
					else if (m[1] === 'true') m[1] = true
					else if (m[1] === 'false') m[1] = false
					else m[1] = +m[1]
					return m
				})
				param = Object.fromEntries(p)
			}
			requestParams.push({
				required: true,
				...param
			})
		})
		return requestParams
	}
	return rows
}
