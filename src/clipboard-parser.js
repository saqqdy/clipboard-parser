const dataTypaMap = {
	string: 'String',
	char: 'String',
	int: 'Number',
	integer: 'Number',
	double: 'Number',
	long: 'Number',
	boolean: 'Boolean',
	object: 'Object',
	map: 'Object',
	array: 'Array',
	list: 'Array',
	float: 'Number'
}
const mapVariableReg = '([\\w="",\\- \\u4e00-\\u9fa5]+)'

export default function clipboardParser(clipdata, options = {}) {
	// 读取类型，默认自动识别 0=auto 1=requestParam 2=pathVariable
	let text = clipdata
			.getData('Text')
			.replace(/\r\n/g, '\n')
			.replace(/\r/g, '\n')
			.replace(/[\n\r]+$/, ''),
		isRequestParam = text.indexOf('@RequestParam') > -1,
		isApiModel = text.indexOf('@ApiModelProperty') > -1,
		notTableData = text.indexOf('\t') === -1 || isRequestParam,
		reg,
		len,
		rows = text.split('\n'),
		params = []
	const { type = isRequestParam ? 1 : isApiModel ? 2 : -1 } = options
	if (type === 1) {
		reg = new RegExp('@RequestParam\\(' + mapVariableReg + '\\)[\\n\\r\\t ]*(@ApiParam\\(' + mapVariableReg + '\\))?[\\n\\r\\t ]*([\\w]+) ([\\w]+)', 'g')
	} else if (type === 2) {
		reg = new RegExp('@ApiModelProperty\\(' + mapVariableReg + '\\)[\\n\\r\\t ]*(private|public)? ?([\\w]+) ([\\w]+)', 'g')
	}
	console.log(rows)
	rows = rows.map((txt, i) => {
		let arr = txt ? txt.split('\t') : []
		if (i === 0) {
			len = +arr.length
		} else if (len === 0 || (i !== rows.length - 1 && len !== arr.length)) {
			// 第一行和最后一行不校验
			notTableData = true
		}
		arr = arr.map(el => el.replace(/\s+/g, ' '))
		return arr
	})
	if (notTableData) {
		rows = rows.map(txt => txt.join('')).join('')
	}
	console.log(rows)
	if (type === 1 && isRequestParam) {
		rows.replace(reg, (a, b, c, d, e, f) => {
			let param1 = {},
				param2 = {}
			if (b.indexOf('=') === -1 && b.indexOf(',') === -1) {
				param1 = { value: b.replace(/^"([\s\S]*)"$/, '$1') }
			} else {
				let pm1 = b.replace(/\s+/g, '').split(',')
				pm1 = pm1.map(param => {
					let m = param.split('=')
					if (/^"[\s\S]*"$/.test(m[1])) m[1] = m[1].replace(/^"([\s\S]*)"$/, '$1')
					else if (m[1] === 'true') m[1] = true
					else if (m[1] === 'false') m[1] = false
					else m[1] = +m[1]
					return m
				})
				param1 = Object.fromEntries(pm1)
			}
			if (d === undefined) {
				console.info('没有ApiParam定义')
			} else if (d.indexOf('=') === -1 && d.indexOf(',') === -1) {
				param2 = { value: d.replace(/^"([\s\S]*)"$/, '$1') }
			} else {
				let pm2 = d.replace(/\s+/g, '').split(',')
				pm2 = pm2.map(param => {
					let m = param.split('=')
					if (/^"[\s\S]*"$/.test(m[1])) m[1] = m[1].replace(/^"([\s\S]*)"$/, '$1')
					else if (m[1] === 'true') m[1] = true
					else if (m[1] === 'false') m[1] = false
					else m[1] = +m[1]
					return m
				})
				param2 = Object.fromEntries(pm2)
			}
			params.push({
				type: dataTypaMap[e.toLowerCase()] || 'String',
				required: typeof param1.required !== 'undefined' ? param1.required : true,
				name: param1.value || f,
				defaultValue: param2.defaultValue || '',
				description: param2.value || ''
			})
		})
		return params
	} else if (type === 2 && isApiModel) {
		rows.replace(reg, (a, b, c, d, e) => {
			let param1 = {}
			if (b.indexOf('=') === -1 && b.indexOf(',') === -1) {
				param1 = { value: b.replace(/^"([\s\S]*)"$/, '$1') }
			} else {
				let pm1 = b.replace(/\s+/g, '').split(',')
				pm1 = pm1.map(param => {
					let m = param.split('=')
					if (/^"[\s\S]*"$/.test(m[1])) m[1] = m[1].replace(/^"([\s\S]*)"$/, '$1')
					else if (m[1] === 'true') m[1] = true
					else if (m[1] === 'false') m[1] = false
					else m[1] = +m[1]
					return m
				})
				param1 = Object.fromEntries(pm1)
			}
			params.push({
				required: true,
				type: d ? dataTypaMap[d.toLowerCase()] : 'String',
				description: param1.value,
				defaultValue: '',
				name: e
			})
		})
		return params
	}
	return rows
}
