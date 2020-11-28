const dataTypaMap = {
	String: 'String',
	Int: 'Number',
	Double: 'Number',
	Long: 'Number',
	Boolean: 'Boolean',
	Object: 'Object',
	Array: 'Array',
	Float: 'Number'
}

export default function (clipdata, readRequestParam = true) {
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
		} else if (len === 0 || (i !== rows.length - 1 && len !== arr.length)) {
			// 最后一行不校验
			notTableData = true
		}
		arr = arr.map(el => el.replace(/\s+/g, ' '))
		return arr
	})
	console.log(rows)
	if (notTableData) {
		rows = rows.map(txt => txt.join('')).join('')
	}
	if (readRequestParam && isRequestParam) {
		// @RequestParam\(([\w="",-]+)\)
		rows.replace(/@RequestParam\(([\w="",\- \u4e00-\u9fa5]+)\)[\n\r\t ]*@ApiParam\(([\w="",\- \u4e00-\u9fa5]+)\)[\n\r\t ]*([\w]+)/g, (a, b, c, d) => {
			let param1 = {},
				param2 = {}
			if (b.indexOf('=') === -1 && b.indexOf(',') === -1) {
				param1 = { value: b.replace(/^"([\s\S]*)"$/, '$1') }
			} else if (c.indexOf('=') === -1 && c.indexOf(',') === -1) {
				param2 = { value: c.replace(/^"([\s\S]*)"$/, '$1') }
			} else {
				let p1 = b.replace(/\s+/g, '').split(','),
					p2 = c.replace(/\s+/g, '').split(',')
				p1 = p1.map(param => {
					let m = param.split('=')
					if (/^"[\s\S]*"$/.test(m[1])) m[1] = m[1].replace(/^"([\s\S]*)"$/, '$1')
					else if (m[1] === 'true') m[1] = true
					else if (m[1] === 'false') m[1] = false
					else m[1] = +m[1]
					return m
				})
				p2 = p2.map(param => {
					let m = param.split('=')
					if (/^"[\s\S]*"$/.test(m[1])) m[1] = m[1].replace(/^"([\s\S]*)"$/, '$1')
					else if (m[1] === 'true') m[1] = true
					else if (m[1] === 'false') m[1] = false
					else m[1] = +m[1]
					return m
				})
				param1 = Object.fromEntries(p1)
				param2 = Object.fromEntries(p2)
			}
			requestParams.push({
				required: true,
				type: dataTypaMap[d] || 'String',
				...param1,
				defaultValue: param2.defaultValue || '',
				description: param2.value || ''
			})
		})
		return requestParams
	}
	return rows
}
