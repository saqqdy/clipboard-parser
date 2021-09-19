[index.md - v2.0.0](README.md) / Exports

# index.md - v2.0.0

## Table of contents

### References

-   [default](modules.md#default)

### Interfaces

-   [ClipboardParserOptionsType](interfaces/ClipboardParserOptionsType.md)

### Functions

-   [clipboardParser](modules.md#clipboardparser)

## References

### default

Renames and exports: [clipboardParser](modules.md#clipboardparser)

## Functions

### clipboardParser

▸ **clipboardParser**(`event`, `options`): `any`

解析剪贴板数据

**`example`** 在 vue 页面组件里面使用

```vue
// vue页面
<template>
    </template><textarea @paste="handlePaste"></textarea>
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

#### Parameters

| Name      | Type                                                                     | Description |
| :-------- | :----------------------------------------------------------------------- | :---------- |
| `event`   | `ClipboardEvent`                                                         | 事件对象    |
| `options` | [`ClipboardParserOptionsType`](interfaces/ClipboardParserOptionsType.md) | 配置项      |

#### Returns

`any`

rows 数据

#### Defined in

[index.ts:76](https://github.com/saqqdy/clipboard-parser/blob/b0cde04/src/index.ts#L76)
