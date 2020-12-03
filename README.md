# clipboard-parser
支持解析@RequestParam/@ApiModelProperty接口定义代码、Word、Excel以及其他表格类数据

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/clipboard-parser.svg?style=flat-square
[npm-url]: https://npmjs.org/package/clipboard-parser
[travis-image]: https://travis-ci.org/saqqdy/clipboard-parser.svg?branch=master
[travis-url]: https://travis-ci.org/saqqdy/clipboard-parser
[codecov-image]: https://img.shields.io/codecov/c/github/saqqdy/clipboard-parser.svg?style=flat-square
[codecov-url]: https://codecov.io/github/saqqdy/clipboard-parser?branch=master
[david-image]: https://img.shields.io/david/saqqdy/clipboard-parser.svg?style=flat-square
[david-url]: https://david-dm.org/saqqdy/clipboard-parser
[snyk-image]: https://snyk.io/test/npm/clipboard-parser/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/clipboard-parser
[download-image]: https://img.shields.io/npm/dm/clipboard-parser.svg?style=flat-square
[download-url]: https://npmjs.org/package/clipboard-parser

# 示例


## 1. 解析@RequestParam格式代码

#### 输入

```java
@RequestParam("rowCount")
@ApiParam(required = false, name = "rowCount", value = "每页容量大小",defaultValue = 10)
    String rowCount,
@RequestParam(value = "current")
@ApiParam(required = false, name = "current", value = "开始页",defaultValue = 1)
    String current,
```

#### 返回结果

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



## 2. 解析@ApiModelProperty格式代码

#### 输入

```java
@ApiModelProperty(value = "id主键", required = true)
    private String id;
@ApiModelProperty(value = "名称")
    private String name;
```

#### 返回结果

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



## 3. 解析word/excel/网页table等表格类数据

#### 输入

| 参数 | 说明     | 类型   | 可选值                 | 必填  | 默认         |
| ---- | -------- | ------ | ---------------------- | ----- | ------------ |
| type | 分支类型 | String | feature/bugfix/support | false | 当前分支类型 |
| name | 分支名称 | String | -                      | false | 当前分支名称 |

#### 返回结果

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

