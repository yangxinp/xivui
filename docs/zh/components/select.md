# Select 选择器

## 基础使用

设置属性 `variant`，修改选择器风格。有 `underlined`、`outlined`、`filled` 三种风格。

:::demo select/basic

:::

## 多选

设置属性 `multiple` 属性即可启用多选。可以设置 `chips` 属性将选中项纸片化，进一步加强交互能力。如果开启了纸片化，还可以显示关闭按钮和选项折叠，需要分别设置 `chips-closable` 和 `chips-collapse`。

:::warning

`chips-collapse` 待实现...

:::

:::demo select/multiple

:::

## 图标

支持在选择器前后内外-四个方位设置图标。

:::demo select/icon

:::

## 筛选

设置 `filterable` 属性开启筛选功能，此外你还需要绑定 `filter-query` 筛选文本，来同步当前输入的筛选文本。利用较大的灵活性去支持额外的业务功能，例如本地过滤和远程数据加载。

:::demo select/filter

:::

## 键值设置

在默认情况下，`value` 绑定的值是选项里 `key` 值，例如：`option['key']`。如果想绑定整个选项 `option`，那么需要设置 `object` 属性，这会非常有效当你需要获取 `option['key']` 以外的值或者未加载选项列表就想显示 `label` 值的情况下（例如：数据首次回显）。

:::tip

绑定的值为 `option[valueKey]`，默认为 `option['key']`。可以通过修改 `valueKey` 属性来改变。
绑定的标签为 `option[labelKey]`，默认为 `option['label']`。可以通过修改 `labelKey` 属性来改变。

:::

:::demo select/object

:::

## Select API

### 属性

| 属性名            | 说明                                  | 类型                             | 默认值       | 是否必填 |
| ----------------- | ------------------------------------- | -------------------------------- | ------------ | -------- |
| value             | 绑定值                                | String/Number/Object/Array       | -            | No       |
| options           | 列表选项                              | Array                            | []           | No       |
| label             | 标签                                  | String                           | ''           | No       |
| placeholder       | 占位文字                              | String                           | -            | No       |
| variant           | 样式类型                              | 'underlined'/'outlined'/'filled' | `underlined` | No       |
| loading           | 是否加载中                            | Boolean                          | false        | No       |
| clearable         | 是否可以清空选项                      | Boolean                          | false        | No       |
| disabled          | 是否禁用                              | Boolean                          | false        | No       |
| multiple          | 是否多选                              | Boolean                          | false        | No       |
| labelKey          | 选项的标签                            | String                           | `label`      | No       |
| valueKey          | 选项的值                              | String                           | `value`      | No       |
| object            | 以选项对象作为值                      | Boolean                          | false        | No       |
| filterable        | 是否开启筛选功能                      | Boolean                          | false        | No       |
| filter-query      | 筛选文本                              | String                           | -            | No       |
| chips             | 选中项为纸片样式                      | Boolean                          | false        | No       |
| chips-closable    | 选中项是否可关闭（`chips`下有效）     | Boolean                          | false        | No       |
| chips-collapse ✖  | 多个选中是否进行折叠（`chips`下有效） | Boolean                          | false        | No       |
| prefix-icon       | 前缀图标                              | String                           | -            | No       |
| prefix-outer-icon | 外部前缀图标                          | String                           | -            | No       |
| suffix-icon       | 后缀图标                              | String                           | -            | No       |
| suffix-outer-icon | 外部后缀图标                          | String                           | -            | No       |
| error             | 是否错误（待加强...📝）                | Boolean                          | false        | No       |
| message           | 提示信息（待加强...📝）                | String                           | -            | No       |
