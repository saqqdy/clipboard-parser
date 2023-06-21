<div style="text-align: center;" align="center">

# clipboard-parser

A tool to read the clipboard and parse out the table data. Support for parsing @RequestParam/@ApiModelProperty interfaces to define code, Word, Excel and other form-like data

[![NPM version][npm-image]][npm-url]
[![Codacy Badge][codacy-image]][codacy-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]
[![gzip][gzip-image]][gzip-url]
[![License][license-image]][license-url]

[![Sonar][sonar-image]][sonar-url]

</div>

<div style="text-align: center; margin-bottom: 20px;" align="center">

### **[Documentation](https://www.saqqdy.com/clipboard-parser)** • **[Change Log](./CHANGELOG.md)**

</div>

## Installing

```bash
# use pnpm
$ pnpm install clipboard-parser

# use npm
$ npm install clipboard-parser --save

# use yarn
$ yarn add clipboard-parser
```

## Usage

```vue
<!-- demo.vue -->
<template>
  <textarea @paste="handlePaste"></textarea>
</template>

<script>
import clipboardParser from 'clipboard-parser'

export default {
  methods: {
    handlePaste(e) {
      const result = clipboardParser(e)
      // ...
    }
  }
}
</script>
```

Using unpkg CDN:

```html
<body>
  <textarea onpaste="handlePaste"></textarea>
</body>
<script src="https://unpkg.com/clipboard-parser@3.0.0/dist/index.global.prod.js"></script>
<script>
  function handlePaste(event) {
    const data = clipboardParser(event)
  }
</script>
```

## Demos

### 1. Parsing JAVA code containing the interface definition of @RequestParam

input

```java
@RequestParam("rowCount")
@ApiParam(required = false, name = "rowCount", value = "page size",defaultValue = 10)
    String rowCount,
@RequestParam(value = "current")
@ApiParam(required = false, name = "current", value = "start page",defaultValue = 1)
    String current,
```

output

```json
[
  {
    "type": "String",
    "required": true,
    "name": "rowCount",
    "defaultValue": 10,
    "description": "page size"
  },
  {
    "type": "String",
    "required": true,
    "name": "current",
    "defaultValue": 1,
    "description": "start page"
  }
]
```

### 2. Parsing JAVA code containing the interface definition of @ApiModelProperty

input

```java
@ApiModelProperty(value = "id key", required = true)
    private String id;
@ApiModelProperty(value = "name")
    private String name;
```

output

```json
[
  {
    "required": true,
    "type": "String",
    "description": "id key",
    "defaultValue": "",
    "name": "id"
  },
  {
    "required": true,
    "type": "String",
    "description": "name",
    "defaultValue": "",
    "name": "name"
  }
]
```

### 3. Parse word/excel/web-page-table and other form-like data

input

| Parameters | Description | Type   | Optional               | Required | Default             |
| ---------- | ----------- | ------ | ---------------------- | -------- | ------------------- |
| type       | branch type | String | feature/bugfix/support | false    | current branch type |
| name       | branch name | String | -                      | false    | current branch name |

output

```json
[
  {
    "name": "type",
    "type": "String",
    "required": false,
    "defaultValue": "",
    "description": "branch type"
  },
  {
    "name": "name",
    "type": "String",
    "required": false,
    "defaultValue": "",
    "description": "branch name"
  }
]
```

## Support & Issues

Please open an issue [here](https://github.com/saqqdy/clipboard-parser/issues).

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/clipboard-parser.svg?style=flat-square
[npm-url]: https://npmjs.org/package/clipboard-parser
[codacy-image]: https://app.codacy.com/project/badge/Grade/f70d4880e4ad4f40aa970eb9ee9d0696
[codacy-url]: https://www.codacy.com/gh/saqqdy/clipboard-parser/dashboard?utm_source=github.com&utm_medium=referral&utm_content=saqqdy/clipboard-parser&utm_campaign=Badge_Grade
[codecov-image]: https://img.shields.io/codecov/c/github/saqqdy/clipboard-parser.svg?style=flat-square
[codecov-url]: https://codecov.io/github/saqqdy/clipboard-parser?branch=master
[download-image]: https://img.shields.io/npm/dm/clipboard-parser.svg?style=flat-square
[download-url]: https://npmjs.org/package/clipboard-parser
[gzip-image]: http://img.badgesize.io/https://unpkg.com/clipboard-parser/lib/index.js?compression=gzip&label=gzip%20size:%20JS
[gzip-url]: http://img.badgesize.io/https://unpkg.com/clipboard-parser/lib/index.js?compression=gzip&label=gzip%20size:%20JS
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
[sonar-image]: https://sonarcloud.io/api/project_badges/quality_gate?project=saqqdy_clipboard-parser
[sonar-url]: https://sonarcloud.io/dashboard?id=saqqdy_clipboard-parser
