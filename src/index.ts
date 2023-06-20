const fromEntries =
	Object.fromEntries ||
	function fromEntries(iterable: any) {
		const entries = Array.isArray(iterable)
			? createEntries(iterable)
			: 'entries' in iterable
			? iterable.entries()
			: iterable
		const object = {}
		let entry
		while ((entry = entries.next()) && !entry.done) {
			const pair = entry.value
			Object.defineProperty(object, pair[0], {
				configurable: true,
				enumerable: true,
				writable: true,
				value: pair[1]
			})
		}
		return object
	}
function createEntries(array: any[]) {
	let i = -1
	return {
		next: function () {
			const done = array.length <= ++i
			return {
				done,
				value: done ? void 0 : array[i]
			}
		}
	}
}
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
} as any
const mapVariableReg = '([\\w="",\\- \\u4e00-\\u9fa5]+)'
const mapIgnoreStringReg = '[\\n\\r\\t ;]*'

export interface ClipboardParserOptionsType {
	type: -1 | 1 | 2
}

/**
 * 解析剪贴板数据
 *
 * @example 在vue页面组件里面使用
 * ```vue
 * // vue页面
 * <template>
 *     </template><textarea @paste="handlePaste"></textarea>
 * </template>
 * <script>
 * import clipboardParser from 'clipboard-parser'
 * export default {
 *     methods: {
 *         handlePaste(e) {
 *             const result = clipboardParser(e)
 *             // ...
 *         }
 *     }
 * }
 * </script>
 * ```
 * @param event - 事件对象
 * @param options - 配置项
 * @returns rows数据
 */
function clipboardParser(event: ClipboardEvent, options: ClipboardParserOptionsType) {
	// 读取类型，默认自动识别 0=auto 1=requestParam 2=pathVariable
	const clipboardData = (window as any).clipboardData || event.clipboardData
	let text: string = clipboardData
			.getData('Text')
			.replace(/\r\n/g, '\n')
			.replace(/\r/g, '\n')
			.replace(/[\n\r]+$/, ''),
		isRequestParam: boolean = text.includes('@RequestParam'),
		isApiModel: boolean = text.includes('@ApiModelProperty') || text.includes('private '),
		notTableData: boolean = !text.includes('\t') || isRequestParam,
		reg: RegExp,
		len: number,
		rows: any = text.split('\n'),
		params: any[] = []
	const { type = isRequestParam ? 1 : isApiModel ? 2 : -1 } = options
	if (type === 1) {
		reg = new RegExp(
			'@RequestParam\\(' +
				mapVariableReg +
				'\\)' +
				mapIgnoreStringReg +
				'(@ApiParam\\(' +
				mapVariableReg +
				'\\))?' +
				mapIgnoreStringReg +
				'([\\w]+) ([\\w]+)',
			'g'
		)
	} else if (type === 2) {
		reg = new RegExp(
			'(@ApiModelProperty\\(' +
				mapVariableReg +
				'\\))?' +
				mapIgnoreStringReg +
				'(private|public)? ?([\\w]+) ([\\w]+)',
			'g'
		)
	} else {
		reg = new RegExp('.+')
	}
	rows = rows.map((txt: string, i: number): any[] => {
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
		rows = rows.map((txt: any[]) => txt.join('')).join('')
	}
	if (type === 1 && isRequestParam) {
		rows.replace(reg, (a: string, b: string, c: string, d: string, e: string, f: string) => {
			let param1: any = {},
				param2: any = {}
			if (!b.includes('=') && !b.includes(',')) {
				param1 = { value: b.replace(/^"([\s\S]*)"$/, '$1') }
			} else {
				let pm1: any = b.replace(/\s+/g, '').split(',')
				pm1 = pm1.map((param: string): any[] => {
					const m: any[] = param.split('=')
					if (/^"[\s\S]*"$/.test(m[1])) m[1] = m[1].replace(/^"([\s\S]*)"$/, '$1')
					else if (m[1] === 'true') m[1] = true
					else if (m[1] === 'false') m[1] = false
					else m[1] = +m[1]
					return m
				})
				param1 = fromEntries(pm1)
			}
			if (d === undefined) {
				console.info('没有ApiParam定义')
			} else if (!d.includes('=') && !d.includes(',')) {
				param2 = { value: d.replace(/^"([\s\S]*)"$/, '$1') }
			} else {
				let pm2: any = d.replace(/\s+/g, '').split(',')
				pm2 = pm2.map((param: string): any[] => {
					const m: any[] = param.split('=')
					if (/^"[\s\S]*"$/.test(m[1])) m[1] = m[1].replace(/^"([\s\S]*)"$/, '$1')
					else if (m[1] === 'true') m[1] = true
					else if (m[1] === 'false') m[1] = false
					else m[1] = +m[1]
					return m
				})
				param2 = fromEntries(pm2)
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
		rows.replace(reg, (a: string, b: string, c: string, d: string, e: string, f: string) => {
			let param1: any = {}
			if (c === undefined) {
				console.info('没有ApiParam定义')
			} else if (!c.includes('=') && !c.includes(',')) {
				param1 = { value: c.replace(/^"([\s\S]*)"$/, '$1') }
			} else {
				let pm1: any = c.replace(/\s+/g, '').split(',')
				pm1 = pm1.map((param: string): any[] => {
					const m: any[] = param.split('=')
					if (/^"[\s\S]*"$/.test(m[1])) m[1] = m[1].replace(/^"([\s\S]*)"$/, '$1')
					else if (m[1] === 'true') m[1] = true
					else if (m[1] === 'false') m[1] = false
					else m[1] = +m[1]
					return m
				})
				param1 = fromEntries(pm1)
			}
			params.push({
				required: true,
				type: e ? dataTypaMap[e.toLowerCase()] : 'String',
				description: param1.value || '',
				defaultValue: '',
				name: f
			})
		})
		return params
	}
	return rows
}

export default clipboardParser
