import pinyin from './pinyin.js';
import _ from 'lodash';

// 字符串匹配，中文首字母拼音匹配，字母小写匹配
const pinYinFilter = (list, filterText, what) => {
    what = what || (v => v);
    filterText = filterText.toLowerCase();
    return _.filter(list, v => {
        let w = what(v);
        if (!_.isString(w)) {
            w = '';
        }
        w = w.toLowerCase();
        //全拼集合
        const normal = _.map(pinyin(w), value => value[0]).join('');
        //首字母集合
        const first_letter = _.map(pinyin(w, 'first_letter'), value => value[0]).join('');

        return (w.indexOf(filterText) > -1 || normal.indexOf(filterText) > -1 || first_letter.indexOf(filterText) > -1);
    });
};

export default pinYinFilter;