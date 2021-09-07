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
declare function clipboardParser(event: ClipboardEvent, options: ClipboardParserOptionsType): any;
export { clipboardParser }
export default clipboardParser;

export declare interface ClipboardParserOptionsType {
    type: -1 | 1 | 2;
}

export { }
