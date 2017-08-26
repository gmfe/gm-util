# gm-util

### Request

见 [Request](./doc/Request.md) [RequestInterceptor](./doc/RequestInterceptor.md)

### timeSync

见 [timeSync](./doc/timeSync.md)

### param

废弃，使用[query-string](https://github.com/sindresorhus/query-string)

### isElementInViewport

`element`整个界面是否在视窗内

### isElementInViewport

`element`是否存在界面在视窗内

### is

- weixin
- mac

### contains

`contains(domA, domB)` domA 是否包含 domB

### getElementPosition

获取元素的位置

### Bundle

配合`react-router`做异步加载的一个组件

### processReactRouterProps

`react-router`从2切4过程中，props会有变动，此方法做个兼容过度，具体见代码

### processHistory

同上

### keyMirror

`keyMirror({A: null}) // 返回 {A: 'A'}`

### injectStore

配合 `mobx` 把 store 注入 组件

```javascript
@injectStore({aStore})
class A extends React.Component {
    render(){
        console.log(this.props.aStore);
        // ...
    }
}
```

### groupByWithIndex

迁移 `lodash` 的时候 xxxBy 方法并没有提供所有， 估这里封装下