import 'core-js/modules/es.array.iterator.js';
import 'core-js/modules/es.object.from-entries.js';
import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/web.dom-collections.iterator.js';
import 'core-js/modules/es.regexp.exec.js';
import 'core-js/modules/es.string.replace.js';
import 'core-js/modules/es.string.split.js';
import 'core-js/modules/es.regexp.constructor.js';
import 'core-js/modules/es.regexp.to-string.js';
import 'core-js/modules/es.array.map.js';
import 'core-js/modules/es.array.join.js';

var fromEntries = Object.fromEntries || function fromEntries(iterable) {
  var entries = Array.isArray(iterable) ? createEntries(iterable) : 'entries' in iterable ? iterable.entries() : iterable;
  var object = {};
  var entry;

  while ((entry = entries.next()) && !entry.done) {
    var pair = entry.value;
    Object.defineProperty(object, pair[0], {
      configurable: true,
      enumerable: true,
      writable: true,
      value: pair[1]
    });
  }

  return object;
};

function createEntries(array) {
  var i = -1;
  return {
    next: function next() {
      var done = array.length <= ++i;
      return {
        done: done,
        value: done ? void 0 : array[i]
      };
    }
  };
}

var dataTypaMap = {
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
};
var mapVariableReg = "([\\w=\"\",\\- \\u4e00-\\u9fa5]+)";
var mapIgnoreStringReg = '[\\n\\r\\t ;]*';
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

function clipboardParser(event, options) {
  // 读取类型，默认自动识别 0=auto 1=requestParam 2=pathVariable
  var clipboardData = window.clipboardData || event.clipboardData;
  var text = clipboardData.getData('Text').replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/[\n\r]+$/, ''),
      isRequestParam = text.indexOf('@RequestParam') > -1,
      isApiModel = text.indexOf('@ApiModelProperty') > -1 || text.indexOf('private ') > -1,
      notTableData = text.indexOf('\t') === -1 || isRequestParam,
      reg,
      len,
      rows = text.split('\n'),
      params = [];
  var _options$type = options.type,
      type = _options$type === void 0 ? isRequestParam ? 1 : isApiModel ? 2 : -1 : _options$type;

  if (type === 1) {
    reg = new RegExp('@RequestParam\\(' + mapVariableReg + '\\)' + mapIgnoreStringReg + '(@ApiParam\\(' + mapVariableReg + '\\))?' + mapIgnoreStringReg + '([\\w]+) ([\\w]+)', 'g');
  } else if (type === 2) {
    reg = new RegExp('(@ApiModelProperty\\(' + mapVariableReg + '\\))?' + mapIgnoreStringReg + '(private|public)? ?([\\w]+) ([\\w]+)', 'g');
  } else {
    reg = new RegExp('.+');
  }

  rows = rows.map(function (txt, i) {
    var arr = txt ? txt.split('\t') : [];

    if (i === 0) {
      len = +arr.length;
    } else if (len === 0 || i !== rows.length - 1 && len !== arr.length) {
      // 第一行和最后一行不校验
      notTableData = true;
    }

    arr = arr.map(function (el) {
      return el.replace(/\s+/g, ' ');
    });
    return arr;
  });

  if (notTableData) {
    rows = rows.map(function (txt) {
      return txt.join('');
    }).join('');
  }

  if (type === 1 && isRequestParam) {
    rows.replace(reg, function (a, b, c, d, e, f) {
      var param1 = {},
          param2 = {};

      if (b.indexOf('=') === -1 && b.indexOf(',') === -1) {
        param1 = {
          value: b.replace(/^"([\s\S]*)"$/, '$1')
        };
      } else {
        var pm1 = b.replace(/\s+/g, '').split(',');
        pm1 = pm1.map(function (param) {
          var m = param.split('=');
          if (/^"[\s\S]*"$/.test(m[1])) m[1] = m[1].replace(/^"([\s\S]*)"$/, '$1');else if (m[1] === 'true') m[1] = true;else if (m[1] === 'false') m[1] = false;else m[1] = +m[1];
          return m;
        });
        param1 = fromEntries(pm1);
      }

      if (d === undefined) {
        console.info('没有ApiParam定义');
      } else if (d.indexOf('=') === -1 && d.indexOf(',') === -1) {
        param2 = {
          value: d.replace(/^"([\s\S]*)"$/, '$1')
        };
      } else {
        var pm2 = d.replace(/\s+/g, '').split(',');
        pm2 = pm2.map(function (param) {
          var m = param.split('=');
          if (/^"[\s\S]*"$/.test(m[1])) m[1] = m[1].replace(/^"([\s\S]*)"$/, '$1');else if (m[1] === 'true') m[1] = true;else if (m[1] === 'false') m[1] = false;else m[1] = +m[1];
          return m;
        });
        param2 = fromEntries(pm2);
      }

      params.push({
        type: dataTypaMap[e.toLowerCase()] || 'String',
        required: typeof param1.required !== 'undefined' ? param1.required : true,
        name: param1.value || f,
        defaultValue: param2.defaultValue || '',
        description: param2.value || ''
      });
    });
    return params;
  } else if (type === 2 && isApiModel) {
    rows.replace(reg, function (a, b, c, d, e, f) {
      var param1 = {};

      if (c === undefined) {
        console.info('没有ApiParam定义');
      } else if (c.indexOf('=') === -1 && c.indexOf(',') === -1) {
        param1 = {
          value: c.replace(/^"([\s\S]*)"$/, '$1')
        };
      } else {
        var pm1 = c.replace(/\s+/g, '').split(',');
        pm1 = pm1.map(function (param) {
          var m = param.split('=');
          if (/^"[\s\S]*"$/.test(m[1])) m[1] = m[1].replace(/^"([\s\S]*)"$/, '$1');else if (m[1] === 'true') m[1] = true;else if (m[1] === 'false') m[1] = false;else m[1] = +m[1];
          return m;
        });
        param1 = fromEntries(pm1);
      }

      params.push({
        required: true,
        type: e ? dataTypaMap[e.toLowerCase()] : 'String',
        description: param1.value || '',
        defaultValue: '',
        name: f
      });
    });
    return params;
  }

  return rows;
}

export { clipboardParser, clipboardParser as default };
