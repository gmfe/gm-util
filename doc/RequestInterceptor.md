RequestInterceptor
        ===

        Request 中间件，提供 `request` `response` `responseError` 三个钩子。

        ## request

        请求前触发，提供 `config`，如需修改 config， return 即可。 比如补充 http header，比如修改 url 导到其他地方。

        ```
        {
        url: xxx,
        data: xxx,
        sucCode: xxx,
        options: xxx
        }
        ```

        ## response

        在业务逻辑介入前，成功触发。提供 `json` 数据和 `config`。 如需修改 json ，则 return 修改后数据即可，也可 return Promise。

        ## responseError

        业务逻辑介入前出错触发。提供 `reason` 和 `config`。

