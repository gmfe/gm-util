Request
===

基于 Fetch 的封装

约定：
- 和后台 JSON 格式交互数据，字段是 `{code: 0, msg: 'adsfa', data: xxxx, ...other}`。 
- 当 code 为 0 时定位为业务上的成功resolve，其他则失败reject
- 只处理业务上的成功和失败，http层错误统一reject（不用关心）

## 怎么用

```js
// get
Request('url').data({id:1}).get().then(json => {
    // resolve
}, reason => {
    // reject
});

// post
Request('url').data({id:1}).post();
```

如果给后台的 body 是 JSON 字符串，则

```javascript
// post json
Request('url').json({id:1}).post();
```

上传文件，直接传即可，会检测，一旦存在 File  类型数据，则转为 FormData 处理

```javascript
Request('url').data({
    file: file
}).post();
```

除 0 外，其他 code 也算业务上的成功

```javascript
// 可数字或数组
Request('url').code(1).get().then(json => {
    if(json.code === 0){
        // something
    }else if(json.code === 1){
        // something
    }
});

Request('url').code([1,2]).get();
```

超时处理，默认是10s，会 `reject('连接超时，请稍后重试')`，可以配置

```
Request('url').timeout(1000); // 单位毫秒， 传 false 则代表关闭超时机制
```

修改 fetch options 的功能则。options 说明 见 fetch 文档。

```javascript
Request('url', options).data({xxx}).get();
```


