import _ from 'lodash';

const map = {}; // { 1: {cbs: [], id: 123, time: 2000}}
const timeSync = {
    add(key, callback, time) {
        if (!map[key]) {
            map[key] = {
                cbs: [callback],
                time
            };
        } else {
            map[key].cbs.push(callback);
        }
    },
    stop(key) {
        if (map[key]) {
            clearInterval(map[key].id);
            map[key].id = null;
        }
    },
    start(key) {
        if (map[key]) {
            if (!map[key].id) {
                map[key].id = setInterval(() => {
                    _.each(map[key].cbs, cb => {
                        cb();
                    });
                }, map[key].time);
            }
        }
    },
    remove(key, fun) {
        if (map[key]) {
            _.remove(map[key].cbs, cb => cb === fun);
        }
    },
    clear(key) {
        if (map[key]) {
            clearInterval(map[key].id);
            map[key] = null;
        }
    }
};

export default timeSync;