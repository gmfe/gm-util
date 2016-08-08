# gm-util

## 介绍

### Request



### RequestInterceptor

`Request`中间件。提供几种钩子。钩子返回promise、obj、nothing，内部会处理成promise处理的 
- `request` 参数`config`，请求前调用
- `response` 参数`json` `config` 请求返回后，业务成功回调
- `responseError` 参数 `reason` `config` 请求出错后，业务出错回调

如果多个地方定义了钩子，则是通过promise一层then一层

```
// config 的是格式是
{
    url, // url
    data, // 请求的数据
    sucCode, // 标记那些code是成功的
    options // 传给 fetch 的 optinos
}
```

### format 

~~deprecated~~，es6的挺好用

### param

obj处理成url。 `param({a:1, b:2})` =》`a=1&b=2`

### isElementInViewport

是否在视窗内

### isElementOverViewport

是否在视窗上可见

### is 

处理各种判断用
- `weixin` 是否微信