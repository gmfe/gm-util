# timeSync

        `setInterval` 同步工具

        同步 setInterval 的触发动作

        - `add(key, callback, time)`
        - `stop(key)`
        - `start(key)`
        - `remove(key, fun)`
        - `clear(key)`

        ```
        // A
        timeSync.add('lala', () => {
        // something
        }, 4000);

        timeSync.add('lala'， () => {
        // something
        }, 4000);

        // 开始
        timeSync.start('lala');

        ```

