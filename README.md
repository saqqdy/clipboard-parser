<div style="text-align: center;" align="center">

# clipboard-parser

支持解析@RequestParam/@ApiModelProperty 接口定义代码、Word、Excel 以及其他表格类数据

[![NPM version][npm-image]][npm-url]
[![Codacy Badge][codacy-image]][codacy-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]
[![gzip][gzip-image]][gzip-url]
[![License][license-image]][license-url]

[![Sonar][sonar-image]][sonar-url]

</div>

## **完整文档请查阅： [API 完整文档](./docs/modules.md)**

## 安装

```shell
# 通过npm安装
npm install -S clipboard-parser

# 或者通过yarn安装
yarn add clipboard-parser
```

## 使用

```vue
# vue页面
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

## 示例

### 1. 解析@RequestParam 格式代码

输入

```java
@RequestParam("rowCount")
@ApiParam(required = false, name = "rowCount", value = "每页容量大小",defaultValue = 10)
    String rowCount,
@RequestParam(value = "current")
@ApiParam(required = false, name = "current", value = "开始页",defaultValue = 1)
    String current,
```

返回结果

```json
[
    {
        "type": "String",
        "required": true,
        "name": "rowCount",
        "defaultValue": 10,
        "description": "每页容量大小"
    },
    {
        "type": "String",
        "required": true,
        "name": "current",
        "defaultValue": 1,
        "description": "开始页"
    }
]
```

### 2. 解析@ApiModelProperty 格式代码

输入

```java
@ApiModelProperty(value = "id主键", required = true)
    private String id;
@ApiModelProperty(value = "名称")
    private String name;
```

返回结果

```json
[
    {
        "required": true,
        "type": "String",
        "description": "id主键",
        "defaultValue": "",
        "name": "id"
    },
    {
        "required": true,
        "type": "String",
        "description": "名称",
        "defaultValue": "",
        "name": "name"
    }
]
```

### 3. 解析 word/excel/网页 table 等表格类数据

输入

| 参数 | 说明     | 类型   | 可选值                 | 必填  | 默认         |
| ---- | -------- | ------ | ---------------------- | ----- | ------------ |
| type | 分支类型 | String | feature/bugfix/support | false | 当前分支类型 |
| name | 分支名称 | String | -                      | false | 当前分支名称 |

返回结果

```json
[
    {
        "name": "type",
        "type": "String",
        "required": false,
        "defaultValue": "",
        "description": "分支类型"
    },
    {
        "name": "name",
        "type": "String",
        "required": false,
        "defaultValue": "",
        "description": "分支名称"
    }
]
```

[npm-image]: https://img.shields.io/npm/v/clipboard-parser.svg?style=flat-square
[npm-url]: https://npmjs.org/package/clipboard-parser
[codacy-image]: https://app.codacy.com/project/badge/Grade/f70d4880e4ad4f40aa970eb9ee9d0696
[codacy-url]: https://www.codacy.com/gh/saqqdy/clipboard-parser/dashboard?utm_source=github.com&utm_medium=referral&utm_content=saqqdy/clipboard-parser&utm_campaign=Badge_Grade
[travis-image]: https://travis-ci.com/saqqdy/clipboard-parser.svg?branch=master
[travis-url]: https://travis-ci.com/saqqdy/clipboard-parser
[codecov-image]: https://img.shields.io/codecov/c/github/saqqdy/clipboard-parser.svg?style=flat-square
[codecov-url]: https://codecov.io/github/saqqdy/clipboard-parser?branch=master
[download-image]: https://img.shields.io/npm/dm/clipboard-parser.svg?style=flat-square
[download-url]: https://npmjs.org/package/clipboard-parser
[gzip-image]: http://img.badgesize.io/https://unpkg.com/clipboard-parser/lib/index.js?compression=gzip&label=gzip%20size:%20JS
[gzip-url]: http://img.badgesize.io/https://unpkg.com/clipboard-parser/lib/index.js?compression=gzip&label=gzip%20size:%20JS
[license-image]: https://img.shields.io/badge/License-MIT-yellow.svg
[license-url]: LICENSE
[sonar-image]: https://sonarcloud.io/api/project_badges/quality_gate?project=saqqdy_clipboard-parser
[sonar-url]: https://sonarcloud.io/dashboard?id=saqqdy_clipboard-parser
