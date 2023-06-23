### 功能

> 实现凯撒加密
>
> 1. 所有位按指定偏移量偏移 √
> 2. 不同位按不同偏移量, 可以自动按不同位使用不同偏移量 ×



> 加密实时转换，解密手动点击按钮。
>
> 注意：`autoConvert` 标志是否实时转换，拉取远程时会关闭，以方便解密，不然拉取完result会被value覆盖



字段属性的下拉框可以添加自定义内容。



#### 偏移值

> 限制在$[1,25]$区间，其实$[-25,-1]$ 也可以，但没有实现。







### 开发者

创建时间手动选择，更新时间自动。

`todo:`

1. 加个日志，用抽屉展示，每条日志都是数组对象，存到一个reactive



### 数据模型

```json

accountInfo{
    title
    site
    notes
    method
    createTime
    updateTime
    items:[]
}


item:{
    index
    label
    value
    flag
}

method:Caesar、Virginia
对象枚举方式

最后删掉为空的项
Flag默认为true
```





```
密码管理 

JSON格式 方便读取

1. 字段设计合理 新增、减少字段 对读取影响不大

方便新增字段


采用字符偏移时，实际记录的偏移值可以再次更改一下，给它+1 -1 之类的

多套偏移表


无论是偏移还是AES，都应该有可以本机运行的加解密程序

这样来看还是偏移方便 同时对密码安全性也没多么高 
```




